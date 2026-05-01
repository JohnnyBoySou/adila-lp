import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PURPLE = new THREE.Color("#3d2d6b");
const PURPLE_DEEP = new THREE.Color("#1a0f3d");

type ShaderRef = {
  uniforms: {
    uTime: { value: number };
    uMouse: { value: THREE.Vector3 };
    uMouseActive: { value: number };
    uVelocity: { value: number };
  };
};

function ChipsModel() {
  const { scene } = useGLTF("/chips.gltf");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const restRotations = useRef<Map<string, THREE.Euler>>(new Map());
  const phases = useRef<Map<string, { offset: number; speed: number }>>(new Map());
  const angles = useRef<Map<string, { angle: number; speedMul: number }>>(new Map());
  const shaders = useRef<ShaderRef[]>([]);
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));
  const mouseTarget = useRef(new THREE.Vector3(0, 0, 0));
  const mousePrev = useRef(new THREE.Vector3(0, 0, 0));
  const mouseActive = useRef(0);
  const velocity = useRef(0);
  const { pointer, viewport } = useThree();

  const glassed = useMemo(() => {
    const cloned = scene.clone(true);
    shaders.current = [];
    let meshIndex = 0;

    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;

      const geo = mesh.geometry.clone();
      geo.computeBoundingBox();
      const center = new THREE.Vector3();
      geo.boundingBox?.getCenter(center);
      geo.translate(-center.x, -center.y, -center.z);
      mesh.geometry = geo;
      mesh.position.add(center);

      const original = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
      const baseColor = Array.isArray(original)
        ? (original[0]?.color?.clone() ?? new THREE.Color("#ffffff"))
        : (original?.color?.clone() ?? new THREE.Color("#ffffff"));

      const tinted = baseColor.clone().lerp(PURPLE, 0.65);
      const attenuation = baseColor.clone().lerp(PURPLE_DEEP, 0.6);

      const mat = new THREE.MeshPhysicalMaterial({
        color: tinted,
        metalness: 0,
        roughness: 0.7,
        transmission: 0.25,
        thickness: 0.6,
        ior: 1.3,
        attenuationColor: attenuation,
        attenuationDistance: 0.7,
        clearcoat: 0,
        iridescence: 1,
        iridescenceIOR: 1.5,
        iridescenceThicknessRange: [200, 800],
        transparent: true,
        envMapIntensity: 0.1,
        side: THREE.DoubleSide,
      });

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = { value: 0 };
        shader.uniforms.uMouse = { value: new THREE.Vector3() };
        shader.uniforms.uMouseActive = { value: 0 };
        shader.uniforms.uVelocity = { value: 0 };

        shader.vertexShader = shader.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
             varying vec3 vWorldPos;`,
          )
          .replace(
            "#include <worldpos_vertex>",
            `#include <worldpos_vertex>
             vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
          );

        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
             uniform float uTime;
             uniform vec3 uMouse;
             uniform float uMouseActive;
             uniform float uVelocity;
             varying vec3 vWorldPos;
             vec3 hueShift(float h) {
               return 0.55 + 0.45 * cos(6.28318 * (h + vec3(0.0, 0.33, 0.67)));
             }`,
          )
          .replace(
            "#include <opaque_fragment>",
            `#include <opaque_fragment>
             vec3 vDir = normalize(vViewPosition);
             float ndv = clamp(dot(vDir, normalize(vNormal)), 0.0, 1.0);
             float fresEdge = pow(1.0 - ndv, 1.6);
             float fresWide = pow(1.0 - ndv, 0.8);
             float dist = length(vWorldPos.xy - uMouse.xy);
             float prox = smoothstep(0.9, 0.0, dist) * uMouseActive;
             float wave = sin(dist * 9.0 - uTime * 5.0) * 0.5 + 0.5;
             float ripple = wave * smoothstep(0.9, 0.0, dist) * uVelocity * 0.6;
             float hueDistShift = dist * 0.4 + uVelocity * 0.25;
             float h = vWorldPos.y * 0.18 + vWorldPos.x * 0.12 + uTime * 0.12 + hueDistShift;
             vec3 rainbow = hueShift(h);
             float glow = prox + ripple;
             float baseDim = mix(0.12, 0.28, prox);
             float wideAmt = glow * 0.18;
             float edgeAmt = glow * 0.7;
             gl_FragColor.rgb *= baseDim;
             gl_FragColor.rgb += rainbow * fresWide * wideAmt;
             gl_FragColor.rgb += rainbow * fresEdge * edgeAmt;`,
          );

        shaders.current.push(shader as unknown as ShaderRef);
      };

      mesh.material = mat;
      restRotations.current.set(mesh.uuid, mesh.rotation.clone());
      phases.current.set(mesh.uuid, {
        offset: meshIndex * 0.45,
        speed: 0.6 + (meshIndex % 3) * 0.15,
      });
      angles.current.set(mesh.uuid, { angle: meshIndex * 0.45, speedMul: 1 });
      meshIndex++;
    });

    return cloned;
  }, [scene]);

  useFrame((_, delta) => {
    mouseTarget.current.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
    const damp = 1 - Math.exp(-delta * 6);
    mouseWorld.current.lerp(mouseTarget.current, damp);

    const rawSpeed = mouseWorld.current.distanceTo(mousePrev.current) / Math.max(delta, 0.0001);
    mousePrev.current.copy(mouseWorld.current);
    velocity.current = THREE.MathUtils.lerp(
      velocity.current,
      Math.min(rawSpeed * 0.18, 1.2),
      delta * 4,
    );

    const isOnCanvas = Math.abs(pointer.x) <= 1 && Math.abs(pointer.y) <= 1;
    mouseActive.current = THREE.MathUtils.lerp(
      mouseActive.current,
      isOnCanvas ? 1 : 0,
      delta * 2.2,
    );

    for (const s of shaders.current) {
      s.uniforms.uTime.value += delta;
      s.uniforms.uMouse.value.copy(mouseWorld.current);
      s.uniforms.uMouseActive.value = mouseActive.current;
      s.uniforms.uVelocity.value = velocity.current;
    }

    glassed.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const rest = restRotations.current.get(mesh.uuid);
      const phase = phases.current.get(mesh.uuid);
      const state = angles.current.get(mesh.uuid);
      if (!rest || !phase || !state) return;

      const isHovered = mesh.uuid === hoveredId;
      state.speedMul = THREE.MathUtils.lerp(state.speedMul, isHovered ? 0 : 1, delta * 4);
      state.angle += phase.speed * state.speedMul * delta;

      mesh.rotation.x = rest.x;
      mesh.rotation.y = rest.y;
      mesh.rotation.z = rest.z + state.angle;
    });
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if ((e.object as THREE.Mesh).isMesh) {
      setHoveredId(e.object.uuid);
      document.body.style.cursor = "pointer";
    }
  };

  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredId(null);
    document.body.style.cursor = "default";
  };

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
      <group scale={0.55}>
        <primitive object={glassed} onPointerOver={handleOver} onPointerOut={handleOut} />
      </group>
    </Float>
  );
}

const FOG_VERTEX = `
  varying vec3 vWorldPos;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const FOG_FRAGMENT = `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uMouseActive;
  uniform float uVelocity;
  varying vec3 vWorldPos;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(
      mix(hash(i+vec2(0.,0.)), hash(i+vec2(1.,0.)), f.x),
      mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), f.x),
      f.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * vnoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 2.6;
    uv.x += uTime * 0.04;
    uv.y += uTime * 0.025;
    float n1 = fbm(uv);
    float n2 = fbm(uv * 1.6 + vec2(uTime * 0.03, -uTime * 0.02));
    float cloud = smoothstep(0.18, 0.85, mix(n1, n2, 0.5));

    float dist = length(vWorldPos.xy - uMouse.xy);
    float ringRadius = uVelocity * 1.2;
    float ring = exp(-pow((dist - ringRadius) * 4.0, 2.0)) * uVelocity * 0.6;
    float disperse = smoothstep(0.85, 0.0, dist) * uMouseActive + ring;
    disperse = clamp(disperse, 0.0, 1.0);

    vec2 cuv = vUv - 0.5;
    float edge = 1.0 - smoothstep(0.32, 0.5, length(cuv));

    float alpha = cloud * (1.0 - disperse) * edge * 0.9;
    vec3 color = mix(vec3(0.03, 0.02, 0.07), vec3(0.08, 0.04, 0.14), n2);
    gl_FragColor = vec4(color, alpha);
  }
`;

function FogCloud() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer, viewport } = useThree();
  const mouseWorld = useRef(new THREE.Vector3());

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3() },
      uMouseActive: { value: 0 },
      uVelocity: { value: 0 },
    }),
    [],
  );
  const mousePrev = useRef(new THREE.Vector3());
  const mouseTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!matRef.current) return;
    uniforms.uTime.value += delta;
    mouseTarget.current.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
    const damp = 1 - Math.exp(-delta * 6);
    mouseWorld.current.lerp(mouseTarget.current, damp);
    uniforms.uMouse.value.copy(mouseWorld.current);

    const rawSpeed = mouseWorld.current.distanceTo(mousePrev.current) / Math.max(delta, 0.0001);
    mousePrev.current.copy(mouseWorld.current);
    uniforms.uVelocity.value = THREE.MathUtils.lerp(
      uniforms.uVelocity.value,
      Math.min(rawSpeed * 0.18, 1.2),
      delta * 4,
    );

    const isOnCanvas = Math.abs(pointer.x) <= 1 && Math.abs(pointer.y) <= 1;
    uniforms.uMouseActive.value = THREE.MathUtils.lerp(
      uniforms.uMouseActive.value,
      isOnCanvas ? 1 : 0,
      delta * 2.2,
    );
  });

  return (
    <mesh position={[0, 0, 1.5]} raycast={() => null} renderOrder={2}>
      <planeGeometry args={[6, 6, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        vertexShader={FOG_VERTEX}
        fragmentShader={FOG_FRAGMENT}
        uniforms={uniforms}
      />
    </mesh>
  );
}

useGLTF.preload("/chips.gltf");

export function ChipsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.04} />
      <directionalLight position={[4, 5, 5]} intensity={0.08} />
      <directionalLight position={[-4, 2, -3]} intensity={0.08} color="#a78bfa" />
      <Suspense fallback={null}>
        <ChipsModel />
        <FogCloud />
        <Environment preset="studio" background={false} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
