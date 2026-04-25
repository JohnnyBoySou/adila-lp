import { Link } from "react-router-dom";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-11 w-11",
};

export function LogoMark({ size = "md", className = "" }: { size?: Size; className?: string }) {
  return (
    <img
      src="/icon.png"
      alt=""
      width={64}
      height={64}
      className={`${sizeMap[size]} rounded-[22%] object-contain shadow-[0_8px_24px_-12px_rgba(91,140,255,0.6)] ${className}`}
      aria-hidden="true"
    />
  );
}

export function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 text-ink font-semibold tracking-tight">
      <LogoMark />
      <span className="text-[17px] font-display">adila</span>
    </Link>
  );
}
