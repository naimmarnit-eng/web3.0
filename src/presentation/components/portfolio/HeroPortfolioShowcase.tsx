"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";

interface ShowcaseProject {
  id: string;
  title: string;
  slug: string;
  coverImage?: string | null;
}

interface HeroPortfolioShowcaseProps {
  projects: ShowcaseProject[];
  fallbackImage?: string;
  fallbackTitle?: string;
}

export function HeroPortfolioShowcase({
  projects,
  fallbackImage = "/uploads/screen_printing_pinterest.jpg",
  fallbackTitle = "Premium Production Studio",
}: HeroPortfolioShowcaseProps) {
  // Filter only projects that have a valid cover image
  const validProjects = React.useMemo(() => {
    return projects.filter((p) => p.coverImage);
  }, [projects]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isFading, setIsFading] = React.useState(false);

  // Automatically rotate slides every 4 seconds
  React.useEffect(() => {
    if (validProjects.length <= 1) return;

    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % validProjects.length);
        setIsFading(false);
      }, 500); // Wait 500ms for fade out transition before updating index
    }, 4500);

    return () => clearInterval(timer);
  }, [validProjects]);

  // Determine active render details
  const hasProjects = validProjects.length > 0;
  const currentProject = hasProjects ? validProjects[activeIndex] : null;
  const activeImage = currentProject?.coverImage || fallbackImage;
  const activeTitle = currentProject?.title || fallbackTitle;
  const activeLink = currentProject ? `/portfolio/${currentProject.slug}` : "/portfolio";

  return (
    <Link
      href={activeLink}
      className="md:col-span-6 relative aspect-16/10 md:aspect-auto md:h-[380px] rounded-[60px_20px_60px_20px] overflow-hidden border border-brand-forest/15 dark:border-brand-lime/15 shadow-xl group block cursor-pointer transition-all duration-300 hover:shadow-brand-forest/10 dark:hover:shadow-brand-lime/10"
    >
      {/* Dynamic Fading Image Container */}
      <div className="w-full h-full bg-neutral-100 dark:bg-zinc-950 overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage}
          alt={activeTitle}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${
            isFading ? "opacity-30 blur-xs scale-98" : "opacity-100 blur-none scale-100"
          }`}
        />
        
        {/* Sleek Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/30 to-transparent dark:from-zinc-950/90 dark:via-zinc-950/20" />

        {/* Hover Indicator ring */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-lime/20 rounded-[60px_20px_60px_20px] transition-colors duration-500 pointer-events-none" />

        {/* Float Glassmorphic Badge */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-zinc-800/35 rounded-full flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-wider">
            {hasProjects ? "Showcase Live" : "Workshop Studio"}
          </span>
        </div>

        {/* Interactive hover circular arrow button */}
        <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-brand-forest shadow-md flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 hover:bg-brand-lime hover:text-brand-forest cursor-pointer">
          <ArrowUpRight className="w-4.5 h-4.5" />
        </div>

        {/* Dynamic Project Metadata (Glassmorphic bottom overlay) */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col justify-end text-left select-none pointer-events-none">
          <span className="text-[10px] font-bold text-brand-lime uppercase tracking-widest block mb-1">
            {hasProjects ? "FEATURED PORTFOLIO PROJECT" : "PREMIUM PRODUCTION LINE"}
          </span>
          <h4 className="text-xl md:text-2xl font-black text-white tracking-tight line-clamp-2 leading-tight drop-shadow-md">
            {activeTitle}
          </h4>
        </div>
      </div>
    </Link>
  );
}
