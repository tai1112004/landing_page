"use client";

import { useEffect, useState } from "react";

export function GlobalBackground() {
  const [pointer, setPointer] = useState({ x: 50, y: 35 });

  useEffect(() => {
    const move = (event: PointerEvent) => setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="global-background" aria-hidden="true">
      <div className="grid-layer" />
      <div className="noise-layer" />
      <div className="pointer-glow" style={{ left: `${pointer.x}%`, top: `${pointer.y}%` }} />
      <div className="network network-a"><i /><i /><i /><i /><span /><span /><span /></div>
      <div className="network network-b"><i /><i /><i /><span /><span /></div>
      <div className="starfield"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="meteor meteor-one" />
      <div className="meteor meteor-two" />
      <div className="meteor meteor-three" />
    </div>
  );
}
