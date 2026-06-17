"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

/**
 * 视频展示区：
 * - IntersectionObserver 监测进入视口时自动播放（静音、循环）。
 * - 保留点击播放按钮作为后备：点击后以有声模式播放。
 */
export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoPlayed, setAutoPlayed] = useState(false);
  const [userPlayed, setUserPlayed] = useState(false);

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const posterUrl = useMemo(
    () => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    [videoId],
  );

  // 进入视口后自动播放（静音 + 循环），仅触发一次
  useEffect(() => {
    const node = containerRef.current;
    if (!node || autoPlayed) return;

    if (typeof IntersectionObserver === "undefined") {
      setAutoPlayed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setAutoPlayed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [autoPlayed]);

  const isActive = autoPlayed || userPlayed;

  // 自动播放走静音+循环（autoplay=1&mute=1&loop=1）；用户点击播放走有声+循环（后备）
  const embedUrl = useMemo(() => {
    if (userPlayed) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playsinline=1&rel=0&playlist=${videoId}`;
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playsinline=1&rel=0&playlist=${videoId}`;
  }, [videoId, userPlayed]);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        {isActive ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setUserPlayed(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* 封面海报 */}
            <img
              src={posterUrl}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/20" />
            {/* 播放按钮（后备） */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-white shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <Play className="ml-1 h-7 w-7 md:h-9 md:w-9" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
