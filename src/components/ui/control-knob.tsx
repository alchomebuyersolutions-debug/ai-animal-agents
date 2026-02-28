"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

interface ReactorKnobProps {
  initialValue?: number; // 0-100
  onChange?: (value: number) => void;
  color?: string; // e.g., "#EC4899" for pink
  label?: string;
  className?: string;
}

export default function ReactorKnob({ 
  initialValue = 37, 
  onChange,
  color = "#f97316",
  label = "LEVEL",
  className
}: ReactorKnobProps) {
  // --- CONFIGURATION ---
  const MIN_DEG = -135;
  const MAX_DEG = 135;
  const TOTAL_TICKS = 40;
  const DEGREES_PER_TICK = (MAX_DEG - MIN_DEG) / TOTAL_TICKS;

  // Calculate initial rotation from value
  const valueToRotation = (val: number) => {
    return MIN_DEG + (val / 100) * (MAX_DEG - MIN_DEG);
  };

  // --- STATE & PHYSICS ---
  const [isDragging, setIsDragging] = useState(false);
  
  const rawRotation = useMotionValue(valueToRotation(initialValue));
  const snappedRotation = useMotionValue(valueToRotation(initialValue));
  
  const smoothRotation = useSpring(snappedRotation, { 
    stiffness: 400, 
    damping: 35, 
    mass: 0.8
  });

  // --- TRANSFORMATIONS ---
  const displayValue = useTransform(smoothRotation, [MIN_DEG, MAX_DEG], [0, 100]);
  const lightOpacity = useTransform(rawRotation, [MIN_DEG, MAX_DEG], [0.05, 0.5]);

  // --- INTERACTION LOGIC ---
  const knobRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback((_e: React.PointerEvent) => {
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!knobRef.current) return;

      const rect = knobRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = e.clientX - centerX;
      const y = e.clientY - centerY;
     
      let rads = Math.atan2(y, x);
      let degs = rads * (180 / Math.PI) + 90;

      if (degs > 180) degs -= 360;
      if (degs < MIN_DEG && degs > -180) degs = MIN_DEG;
      if (degs > MAX_DEG) degs = MAX_DEG;

      rawRotation.set(degs);
      const snap = Math.round(degs / DEGREES_PER_TICK) * DEGREES_PER_TICK;
      snappedRotation.set(snap);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, rawRotation, snappedRotation, DEGREES_PER_TICK, MAX_DEG, MIN_DEG]);

  // Notify parent of value changes
  useMotionValueEvent(displayValue, "change", (latest) => {
    if (onChange) {
      onChange(Math.round(latest));
    }
  });

  const ticks = Array.from({ length: TOTAL_TICKS + 1 });

  return (
    <div className={cn("relative w-64 h-64 select-none", className)}>
      
      {/* Background Glow */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-75" 
        style={{ 
          opacity: lightOpacity,
          backgroundColor: color
        }}
      />

      {/* Tick Marks Ring */}
      <div className="absolute inset-0 pointer-events-none">
        {ticks.map((_, i) => {
          const angle = (i / TOTAL_TICKS) * (MAX_DEG - MIN_DEG) + MIN_DEG;
          return (
            <div
              key={i}
              className="absolute top-0 left-1/2 w-1 h-full -translate-x-1/2"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <TickMark currentRotation={smoothRotation} angle={angle} color={color} />
            </div>
          );
        })}
      </div>

      {/* The Knob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
        <motion.div
          ref={knobRef}
          className={`relative w-full h-full rounded-full touch-none z-20 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ rotate: smoothRotation }}
          onPointerDown={handlePointerDown}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Knob Body */}
          <div className="w-full h-full rounded-full bg-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-neutral-800 flex items-center justify-center relative overflow-hidden">
            
            {/* Brushed Metal Texture */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%),conic-gradient(from_0deg,transparent_0deg,#000_360deg)]" />
            
            {/* Top Cap */}
            <div className="relative w-24 h-24 rounded-full bg-neutral-950 shadow-[inset_0_2px_5px_rgba(0,0,0,1)] border border-neutral-800/50 flex items-center justify-center">
              
              {/* Indicator Line */}
              <motion.div 
                className="absolute top-3 w-1.5 h-5 rounded-full" 
                style={{ 
                  backgroundColor: color,
                  boxShadow: useTransform(rawRotation, (r) => `0 0 ${Math.max(5, (r + 135) / 10)}px ${color}`) 
                }} 
              />
              
              <div className="flex flex-col items-center mt-4 opacity-50">
                <span className="font-mono text-[10px] text-neutral-500 tracking-widest">{label}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Digital Readout */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <span className="text-[10px] text-neutral-600 font-mono tracking-[0.2em] mb-1">OUTPUT</span>
        <DisplayValue value={displayValue} color={color} />
      </div>

    </div>
  );
}

function TickMark({ currentRotation, angle, color }: { currentRotation: any, angle: number, color: string }) {
  const opacity = useTransform(currentRotation, (r) => {
    const rotation = r as number;
    return rotation >= angle ? 1 : 0.2;
  });
  const tickColor = useTransform(currentRotation, (r) => {
    const rotation = r as number;
    return rotation >= angle ? color : "#404040";
  });
  const boxShadow = useTransform(currentRotation, (r) => {
    const rotation = r as number;
    return rotation >= angle ? `0 0 8px ${color}99` : "none";
  });

  return (
    <motion.div 
      style={{ backgroundColor: tickColor, opacity, boxShadow }}
      className="w-1 h-2.5 rounded-full transition-colors duration-75"
    />
  );
}

function DisplayValue({ value, color }: { value: any, color: string }) {
  const [display, setDisplay] = useState(37);
  useMotionValueEvent(value, "change", (latest) => setDisplay(Math.round(latest as number)));
  
  return (
    <div className="relative">
      <span 
        className="absolute inset-0 blur-sm font-mono text-3xl font-black tabular-nums tracking-widest opacity-50"
        style={{ color }}
      >
        {display.toString().padStart(3, '0')}
      </span>
      <span 
        className="relative font-mono text-3xl font-black tabular-nums tracking-widest"
        style={{ color }}
      >
        {display.toString().padStart(3, '0')}
        <span className="text-sm text-neutral-600 ml-1">%</span>
      </span>
    </div>
  );
}
