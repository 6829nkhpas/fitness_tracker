"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function CTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 800);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Gradient with subtle motion */}
      <div className="absolute inset-0 -z-10 bg-black">
        <motion.div
          className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-lime/30 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-purple-500/30 blur-[120px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Ready to crush your goals?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Join thousands of athletes who are already training smarter with FitTrack.
            Start your free 14-day trial today.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md">
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Mail className="h-5 w-5 text-zinc-500" aria-hidden="true" />
              </div>
              <input
                type="email"
                required
                className={cn(
                  "block w-full rounded-full border border-white/10 bg-white/5 backdrop-blur-xl py-4 pl-12 pr-36 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] ring-0 outline-none",
                  "focus:border-lime focus:shadow-[0_0_20px_rgba(204,255,0,0.5)] sm:text-sm sm:leading-6 placeholder:text-zinc-500 transition-all duration-300",
                  status === "error" && "border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(255,0,0,0.5)]",
                )}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "loading" || status === "success"}
              />
              <div className="absolute inset-y-1 right-1 flex">
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={cn(
                    "flex items-center justify-center rounded-full bg-lime px-6 text-sm font-semibold text-black shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all",
                    "hover:shadow-[0_0_30px_rgba(204,255,0,0.6)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:active:scale-100",
                  )}
                >
                  {status === "loading" ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-r-transparent" />
                  ) : status === "success" ? (
                    "Sent!"
                  ) : (
                    <>
                      Join Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
            {status === "error" && (
              <p className="mt-2 text-sm text-red-400 text-left pl-4">
                Please enter a valid email address.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
