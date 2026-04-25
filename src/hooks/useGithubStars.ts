import { useEffect, useState } from "react";

const TTL_MS = 60 * 60 * 1000;

type Cache = { count: number; at: number };

export function useGithubStars(repo: string) {
  const cacheKey = `adila-gh-stars:${repo}`;
  const [stars, setStars] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Cache;
      if (Date.now() - parsed.at < TTL_MS) return parsed.count;
    } catch {
      /* ignore */
    }
    return null;
  });

  useEffect(() => {
    let cancelled = false;
    const cached = (() => {
      try {
        const raw = localStorage.getItem(cacheKey);
        if (!raw) return null;
        return JSON.parse(raw) as Cache;
      } catch {
        return null;
      }
    })();

    if (cached && Date.now() - cached.at < TTL_MS) return;

    fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { stargazers_count?: number } | null) => {
        if (cancelled || !data || typeof data.stargazers_count !== "number") return;
        setStars(data.stargazers_count);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ count: data.stargazers_count, at: Date.now() } satisfies Cache),
          );
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        /* swallow — keep cached value or null */
      });

    return () => {
      cancelled = true;
    };
  }, [cacheKey, repo]);

  return stars;
}

export function formatStars(n: number, locale: string) {
  if (n >= 1000) {
    const v = n / 1000;
    return `${v.toFixed(v >= 10 ? 0 : 1)}k`;
  }
  return n.toLocaleString(locale);
}
