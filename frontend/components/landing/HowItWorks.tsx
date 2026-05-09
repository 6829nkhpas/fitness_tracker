"use client";

import { motion } from "framer-motion";
import { UserPlus, Target, TrendingUp, Dumbbell, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "signup",
    title: "Quick Sign Up",
    description: "Create your free account in under 30 seconds. No credit card required.",
    icon: UserPlus,
  },
  {
    id: "goals",
    title: "Set Your Goals",
    description: "Tell us what you're training for and we'll build a personalized program.",
    icon: Target,
  },
  {
    id: "track",
    title: "Track Progress",
    description: "Log workouts and watch your data turn into real, measurable results.",
    icon: TrendingUp,
  },
  {
    id: "results",
    title: "Achieve Results",
    description: "Hit milestones and elevate your endurance with expert guidance.",
    icon: Dumbbell,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 lg:py-32">
      {/* Subtle Neon Background Glows */}
      <div className="absolute top-1/4 left-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-lime/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* ─── Typography Header ─── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-24">
          <motion.div variants={FADE_UP} className="flex flex-col items-start gap-8 w-full lg:w-1/2">
            <h2 className="font-display text-6xl sm:text-7xl lg:text-[9rem] font-bold text-foreground tracking-tighter leading-none">
              How It
            </h2>
            <p className="max-w-sm text-sm font-medium text-muted-foreground ml-0 lg:ml-24">
              Whether you&apos;re a beginner looking to kickstart your fitness journey or an experienced athlete aiming to reach new heights.
            </p>
          </motion.div>
          <motion.div variants={FADE_UP} className="flex flex-col items-start lg:items-end gap-8 w-full lg:w-1/2 mt-0 lg:mt-24">
            <p className="max-w-sm text-sm font-medium text-muted-foreground mr-0 lg:mr-24 text-left lg:text-right">
              At FitTrack, we are dedicated to helping you achieve your health and wellness goals with a comprehensive range of fitness tracking tools.
            </p>
            <h2 className="font-display text-6xl sm:text-7xl lg:text-[9rem] font-bold text-foreground tracking-tighter leading-none">
              Works
            </h2>
          </motion.div>
        </div>

        {/* ─── Cutout Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={FADE_UP}
                className="relative overflow-visible rounded-[32px] border border-border/50 bg-card/10 backdrop-blur-xl p-6 sm:p-8 pt-10 h-full flex flex-col group transition-all hover:border-lime/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.15)]"
              >
                {/* Floating Arrow Button */}
                <button className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-card backdrop-blur-xl border border-border/50 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-lime group-hover:text-black group-hover:border-lime group-hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] z-30">
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </button>

                {/* Card Content */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white mb-16 transition-all duration-300 group-hover:bg-lime/20 group-hover:border-lime/50 group-hover:text-lime group-hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                
                <div className="mt-auto">
                  <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
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
