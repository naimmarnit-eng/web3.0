import * as React from "react";
import type { Metadata } from "next";

import { container } from "@/infrastructure/di/container";
import { ContactAuditTable } from "./_components/ContactAuditTable";

export const metadata: Metadata = {
  title: "บันทึกข้อความติดต่อ (Contact Inquiries Audit Log)",
  description: "กล่องรับข้อความติดต่อและประเมินราคาจากผู้ใช้งานระบบ",
};

export default async function AdminContactsPage() {
  // Fetch inquiries from DI container
  const inquiries = await container.listInquiries.execute();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
          กล่องข้อความติดต่อ (Contact Inquiries)
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          สืบค้น อ่านข้อความติดต่อประเมินราคา และจัดการคลังข้อความตามสิทธิ์การดำเนินงานด้านข้อมูลของผู้ดูแลระบบ
        </p>
      </div>

      {/* Audit log list table */}
      <ContactAuditTable inquiries={inquiries} />
    </div>
  );
}
