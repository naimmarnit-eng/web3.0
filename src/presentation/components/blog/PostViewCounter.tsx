"use client";

import * as React from "react";
import { incrementPostViewsAction } from "@/presentation/actions/blog.actions";

interface PostViewCounterProps {
  postId: string;
}

export function PostViewCounter({ postId }: PostViewCounterProps) {
  React.useEffect(() => {
    if (!postId) return;

    // Asynchronously trigger the server action to increment views in the database
    // This runs completely in the background without affecting page loading times
    incrementPostViewsAction(postId).catch((err) => {
      console.error("[View Counter Error] Failed to register dynamic post view:", err);
    });
  }, [postId]);

  return null; // Invisible component
}
