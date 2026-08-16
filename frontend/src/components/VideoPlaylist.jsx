import { useEffect, useRef, useState } from "react";

export default function VideoPlaylist({ sources, className = "", testIdPrefix = "video-playlist" }) {
  const vidRefs = useRef([]);
  const [active, setActive] = useState(0);
  const switching = useRef(false);

  const switchVideo = (from) => {
    if (switching.current) return;
    switching.current = true;
    const next = (from + 1) % sources.length;
    const nextEl = vidRefs.current[next];
    if (nextEl) {
      nextEl.currentTime = 0;
      nextEl.play().catch(() => {});
    }
    setActive(next);
    setTimeout(() => {
      switching.current = false;
    }, 1500);
  };

  const handleTimeUpdate = (i) => {
    const v = vidRefs.current[i];
    if (!v || i !== active || switching.current) return;
    if (v.duration && v.duration - v.currentTime < 1.1) switchVideo(i);
  };

  useEffect(() => {
    const v = vidRefs.current[0];
    if (v) v.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} data-testid={testIdPrefix}>
      {sources.map((video, i) => (
        <video
          key={video.mp4}
          ref={(el) => (vidRefs.current[i] = el)}
          data-testid={`${testIdPrefix}-${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${active === i ? "opacity-100" : "opacity-0"}`}
          muted
          playsInline
          autoPlay={i === 0}
          preload="auto"
          disablePictureInPicture
          onTimeUpdate={() => handleTimeUpdate(i)}
          onEnded={() => switchVideo(i)}
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          <source src={video.mp4} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
