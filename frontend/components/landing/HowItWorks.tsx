"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Activity, Zap, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "ignition",
    title: "System Ignition",
    description: "Initialize your biometric profile in under 30 seconds. No hardware required. Pure digital synergy.",
    number: "01",
    align: "left",
    icon: Zap,
    dataLabel: "Neural Link",
    dataValue: "ACTIVE"
  },
  {
    id: "calibrate",
    title: "Calibrate Targets",
    description: "Lock in your performance vectors and let our neural algorithm map your optimal physiological trajectory.",
    number: "02",
    align: "right",
    icon: Cpu,
    dataLabel: "Algorithm",
    dataValue: "SYNCING..."
  },
  {
    id: "telemetry",
    title: "Telemetry Sync",
    description: "Stream real-time workout telemetry directly from your environment. Watch raw data synthesize into actionable intelligence.",
    number: "03",
    align: "left",
    icon: Activity,
    dataLabel: "Data Stream",
    dataValue: "99.9% VOL"
  },
  {
    id: "dominate",
    title: "Dominate Metrics",
    description: "Shatter previous milestones, rewrite your limitations, and ascend to absolute peak performance.",
    number: "04",
    align: "right",
    icon: Database,
    dataLabel: "Metrics",
    dataValue: "MAXIMUM"
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export function HowItWorks() {
  return (
    <section id="system" className="relative w-full bg-background py-32 overflow-hidden">
      {/* Intense Core Glows */}
      <div className="absolute top-1/4 left-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-lime/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />
      
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* ─── Unified Headline ─── */}
        <div className="mb-32 max-w-3xl">
          <motion.h2 
            variants={FADE_UP} 
            className="font-display text-5xl sm:text-7xl lg:text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 tracking-tighter leading-[0.9]"
          >
            The Protocol
          </motion.h2>
          <motion.p 
            variants={FADE_UP} 
            className="mt-8 text-lg sm:text-xl font-medium text-muted-foreground max-w-xl border-l-2 border-lime pl-6"
          >
            Aura bypasses traditional tracking methods. Our proprietary four-phase protocol guarantees total metric domination.
          </motion.p>
        </div>

        {/* ─── Asymmetric Zig-Zag Layout ─── */}
        <div className="flex flex-col gap-24 sm:gap-32 relative">
          
          {/* Central connecting line (Desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-lime/30 to-transparent -translate-x-1/2" />

          {STEPS.map((step, index) => {
            const isRight = step.align === "right";
            
            return (
              <motion.div
                key={step.id}
                variants={FADE_UP}
                className={cn(
                  "relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full group",
                  isRight ? "lg:flex-row-reverse" : ""
                )}
              >
                
                {/* Visual Node */}
                <div className="w-full lg:w-1/2 flex justify-center relative">
                  {/* Giant Background Number */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[12rem] sm:text-[18rem] font-bold text-white/5 select-none pointer-events-none group-hover:text-lime/5 transition-colors duration-700">
                    {step.number}
                  </div>
                  
                  {/* Glassmorphic Core Component */}
                  <div className="relative w-full max-w-sm aspect-square rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col justify-between p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-lime/30 group-hover:shadow-[0_0_60px_rgba(204,255,0,0.15)] group-hover:-translate-y-2">
                    <div className="flex justify-between items-start">
                      <div className="font-mono text-xs tracking-widest text-lime uppercase opacity-80">Phase {step.number}</div>
                      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-lime group-hover:text-black group-hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] group-hover:scale-110">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                    
                    <div className="w-full h-1/2 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/5 group-hover:from-lime/10 group-hover:to-lime/20 transition-colors duration-500 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
                      <step.icon size={48} className="text-lime z-10" strokeWidth={1.5} />
                      <div className="z-10 text-center">
                        <div className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">{step.dataLabel}</div>
                        <div className="text-sm font-bold text-white tracking-widest font-mono">{step.dataValue}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className={cn(
                  "w-full lg:w-1/2 flex flex-col justify-center",
                  isRight ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"
                )}>
                  <div className="inline-flex items-center justify-center rounded-full border border-lime/30 bg-lime/10 px-4 py-1.5 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-lime">Step {index + 1}</span>
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                    {step.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-zinc-400 max-w-md leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
