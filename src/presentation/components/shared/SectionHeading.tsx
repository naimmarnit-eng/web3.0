import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3 max-w-2xl",
        align === "center" && "mx-auto text-center",
        align === "right" && "ml-auto text-right",
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-zinc-100 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
