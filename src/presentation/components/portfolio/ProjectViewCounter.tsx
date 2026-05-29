"use client";

import * as React from "react";
import { incrementProjectViewsAction } from "@/presentation/actions/portfolio.actions";

interface ProjectViewCounterProps {
  projectId: string;
}

export function ProjectViewCounter({ projectId }: ProjectViewCounterProps) {
  React.useEffect(() => {
    if (!projectId) return;

    // Asynchronously trigger the server action to increment views in the database
    // This runs completely in the background without affecting page loading times
    incrementProjectViewsAction(projectId).catch((err) => {
      console.error("[View Counter Error] Failed to register dynamic project view:", err);
    });
  }, [projectId]);

  return null; // Invisible component
}
