"use client";

import { useEffect, useRef } from "react";
import { FireField } from "./engine";

interface FireFieldProps {
  reduced?: boolean;
}

export default function FireFieldComponent({ reduced = false }: FireFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<FireField | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize the engine
    const engine = new FireField(container, { reduced });
    engineRef.current = engine;
    engine.start();

    // Resize handler
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      engine.destroy();
      engineRef.current = null;
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[220px] bg-zinc-950 flex items-center justify-center cursor-crosshair overflow-hidden rounded-[10px]"
    />
  );
}
