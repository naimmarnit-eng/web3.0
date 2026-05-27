"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

// Format: Theme-aware variables
export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    color?: string;
    theme?: Record<string, string>;
  }
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer.");
  }
  return context;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, config, children, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = id || `chart-${uniqueId.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-grid-horizontal_line]:stroke-neutral-200 dark:[&_.recharts-cartesian-grid-horizontal_line]:stroke-neutral-800 [&_.recharts-cartesian-grid-vertical_line]:stroke-neutral-200 dark:[&_.recharts-cartesian-grid-vertical_line]:stroke-neutral-800 [&_.recharts-curve.recharts-area]:fill-opacity-10 [&_.recharts-dot]:stroke-white [&_.recharts-grid-line]:stroke-neutral-200 dark:[&_.recharts-grid-line]:stroke-neutral-800 [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-tooltip-cursor]:stroke-neutral-200 dark:[&_.recharts-tooltip-cursor]:stroke-neutral-800 [&_.recharts-reference-line-line]:stroke-neutral-200 dark:[&_.recharts-reference-line-line]:stroke-neutral-800",
          className
        )}
        {...props}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            #${chartId} {
              ${Object.entries(config)
                .map(([key, value]) => `--color-${key}: ${value.color};`)
                .join("\n")}
            }
          `
        }} />
        <div id={chartId} className="w-full h-full">
          <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
            {children as any}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

export const ChartTooltip = RechartsPrimitive.Tooltip;

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: any[];
    labelKey?: string;
    labelFormatter?: (value: any) => React.ReactNode;
    indicator?: "line" | "dashed" | "dot";
    hideLabel?: boolean;
  }
>(
  (
    {
      active,
      payload,
      labelFormatter,
      indicator = "dot",
      hideLabel = false,
      labelKey,
      className,
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload || payload.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-zinc-950 p-2.5 shadow-md text-xs text-neutral-900 dark:text-zinc-100",
          className
        )}
      >
        {!hideLabel && (
          <div className="font-semibold text-zinc-600 dark:text-zinc-400">
            {payload[0].payload.month || payload[0].payload.name || payload[0].name}
          </div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = item.dataKey;
            const itemConfig = config[key];
            const color = itemConfig?.color || item.color;
            const label = itemConfig?.label || item.name;

            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      indicator === "line" && "h-0.5 w-3 rounded-none",
                      indicator === "dashed" && "h-0.5 w-3 border-t border-dashed bg-transparent"
                    )}
                    style={{
                      backgroundColor: color,
                    }}
                  />
                  <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
                </div>
                <span className="font-bold font-mono text-right">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";
