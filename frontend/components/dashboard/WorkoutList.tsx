"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EXERCISES = [
  { id: "1", name: "Barbell Squat", sets: "4 sets x 8-10 reps", completed: true },
  { id: "2", name: "Romanian Deadlift", sets: "3 sets x 10-12 reps", completed: false },
  { id: "3", name: "Walking Lunges", sets: "3 sets x 20 steps", completed: false },
  { id: "4", name: "Leg Press", sets: "3 sets x 12-15 reps", completed: false },
  { id: "5", name: "Calf Raises", sets: "4 sets x 15-20 reps", completed: false },
];

export function WorkoutList() {
  const [exercises, setExercises] = useState(EXERCISES);

  const toggleExercise = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  const completedCount = exercises.filter((ex) => ex.completed).length;
  const progress = (completedCount / exercises.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full w-full flex-col rounded-2xl border border-border/50 bg-card backdrop-blur-xl shadow-lg"
    >
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">Today&apos;s Workout</h3>
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Clock size={14} /> 45 min
          </span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">Lower Body Power</div>
        
        {/* Progress Bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50">
            <motion.div
              className="h-full bg-lime shadow-[0_0_10px_rgba(204,255,0,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <span className="text-xs font-medium text-foreground">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Checklist */}
      <div className="flex-1 overflow-y-auto p-2">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => toggleExercise(exercise.id)}
            className="group flex cursor-pointer items-center justify-between rounded-xl p-4 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  exercise.completed
                    ? "border-lime bg-lime text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]"
                    : "border-muted-foreground/30 bg-transparent text-transparent",
                )}
              >
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    exercise.completed ? "text-muted-foreground line-through" : "text-foreground",
                  )}
                >
                  {exercise.name}
                </span>
                <span className="text-xs text-muted-foreground">{exercise.sets}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
