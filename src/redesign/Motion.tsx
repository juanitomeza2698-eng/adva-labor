"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";

export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

// Content is present in SSR and without JS. Motion does not gate reading or LCP.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={false}
      whileInView={
        reduced
          ? undefined
          : { transform: ["translateY(10px)", "translateY(0px)"] }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
