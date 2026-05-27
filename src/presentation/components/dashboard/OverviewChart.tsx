"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/presentation/components/ui/chart";

interface MonthlyStat {
  month: string;
  posts: number;
  projects: number;
  contacts: number;
}

interface OverviewChartProps {
  data: MonthlyStat[];
}

const chartConfig = {
  posts: {
    label: "บทความ (Posts)",
    color: "#6366f1", // Indigo
  },
  projects: {
    label: "ผลงาน (Projects)",
    color: "#10b981", // Emerald
  },
  contacts: {
    label: "ข้อความ (Contacts)",
    color: "#f59e0b", // Amber
  },
};

export function OverviewChart({ data }: OverviewChartProps) {
  // Format Thai Month labels (e.g. 2026-05 -> พ.ค. 69)
  const formattedData = data.map((d) => {
    const [year, month] = d.month.split("-");
    const thaiMonths = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    const monthIndex = parseInt(month, 10) - 1;
    const monthLabel = thaiMonths[monthIndex] || month;
    const yearBE = parseInt(year, 10) + 543; // Convert to Buddhist Era
    const yearLabel = yearBE.toString().substring(2);
    
    return {
      ...d,
      formattedMonth: `${monthLabel} ${yearLabel}`,
    };
  });

  return (
    <Card className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl shadow-xs overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
          กราฟแสดงสถิติความเติบโตและการมีส่วนร่วม
        </CardTitle>
        <CardDescription className="text-xs text-zinc-400">
          จำนวนข้อมูลบทความ ผลงาน และจำนวนข้อความที่ลูกค้าทักเข้ามาเปรียบเทียบเชิงรายเดือน
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="w-full h-[320px]">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.posts.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={chartConfig.posts.color} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.projects.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={chartConfig.projects.color} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.contacts.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={chartConfig.contacts.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="formattedMonth"
              stroke="#888888"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#888888"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              name={chartConfig.posts.label}
              type="monotone"
              dataKey="posts"
              stroke={chartConfig.posts.color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPosts)"
            />
            <Area
              name={chartConfig.projects.label}
              type="monotone"
              dataKey="projects"
              stroke={chartConfig.projects.color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProjects)"
            />
            <Area
              name={chartConfig.contacts.label}
              type="monotone"
              dataKey="contacts"
              stroke={chartConfig.contacts.color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorContacts)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
