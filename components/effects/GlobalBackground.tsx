"use client";

import { useEffect, useRef } from "react";

export function GlobalBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const glow = glowRef.current;
      if (!glow || event.pointerType === "touch") return;
      glow.style.left = `${(event.clientX / window.innerWidth) * 100}%`;
      glow.style.top = `${(event.clientY / window.innerHeight) * 100}%`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="global-background" aria-hidden="true">
      <div className="grid-layer" />
      <div className="noise-layer" />
      <div ref={glowRef} className="pointer-glow" style={{ left: "50%", top: "35%" }} />
      <div className="network network-a"><i /><i /><i /><i /><span /><span /><span /></div>
      <div className="network network-b"><i /><i /><i /><span /><span /></div>
      <div className="starfield"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="meteor meteor-one" />
      <div className="meteor meteor-two" />
      <div className="meteor meteor-three" />
    </div>
  );
}
