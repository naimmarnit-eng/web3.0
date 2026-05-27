"use client";

import * as React from "react";
import { toast } from "sonner";
import { Search, Eye, Trash2, Calendar, Mail, Phone, User, MessageSquare, ShieldAlert, Loader2 } from "lucide-react";

import type { Contact } from "@/domain/entities/contact";
import { deleteInquiryAction, markInquiryReadAction } from "@/presentation/actions/contact.actions";
import { Button } from "@/presentation/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/presentation/components/ui/input";
import { Badge } from "@/presentation/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/presentation/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/presentation/components/ui/alert-dialog";

interface ContactAuditTableProps {
  inquiries: Contact[];
}

export function ContactAuditTable({ inquiries }: ContactAuditTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedInquiry, setSelectedInquiry] = React.useState<Contact | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = React.useState<Contact | null>(null);
  const [isDeleting, startDeleteTransition] = React.useTransition();

  // Client-side quick search filtering
  const filteredInquiries = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return inquiries;

    return inquiries.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        (item.email && item.email.toLowerCase().includes(query)) ||
        (item.phone && item.phone.includes(query)) ||
        item.message.toLowerCase().includes(query)
    );
  }, [inquiries, searchQuery]);

  const handleDelete = () => {
    if (!inquiryToDelete) return;

    startDeleteTransition(async () => {
      const res = await deleteInquiryAction(inquiryToDelete.id);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("ลบข้อความติดต่อเรียบร้อยแล้ว");
      setInquiryToDelete(null);
    });
  };

  const handleViewInquiry = (inquiry: Contact) => {
    setSelectedInquiry(inquiry);

    // If message is unread, immediately trigger transition to mark it as read
    if (!inquiry.isRead) {
      React.startTransition(async () => {
        const res = await markInquiryReadAction(inquiry.id);
        if (res?.error) {
          console.error("Failed to mark inquiry as read:", res.error);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Filter bar */}
      <div className="bg-white dark:bg-zinc-900/45 border border-neutral-200 dark:border-neutral-800/80 rounded-xl p-4 shadow-xs">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
          <Input
            placeholder="ค้นหาข้อความตามชื่อผู้ส่ง, อีเมล, เบอร์โทร หรือรายละเอียด..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-neutral-50/50 dark:bg-zinc-950/40 border-neutral-200 dark:border-neutral-800/80 focus-visible:ring-1 focus-visible:ring-neutral-400"
          />
        </div>
      </div>

      {/* 2. Main Audit Log Table */}
      <div className="border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-zinc-900/20 rounded-xl overflow-hidden shadow-sm">
        {filteredInquiries.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700" />
            <h3 className="mt-4 text-sm font-semibold text-neutral-900 dark:text-zinc-100">
              ไม่พบข้อความติดต่อ
            </h3>
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              {searchQuery ? "ลองพิมพ์ค้นหาด้วยเงื่อนไขอื่น" : "ขณะนี้ยังไม่มีผู้ส่งข้อความติดต่อเข้ามา"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50/50 dark:bg-zinc-950/40 border-b border-neutral-200 dark:border-neutral-800/85">
                <TableRow className="border-neutral-200 dark:border-neutral-800/80">
                  <TableHead className="font-bold py-3.5 text-neutral-800 dark:text-zinc-200">ผู้ติดต่อ</TableHead>
                  <TableHead className="font-bold py-3.5 text-neutral-800 dark:text-zinc-200">ข้อมูลการติดต่อ</TableHead>
                  <TableHead className="font-bold py-3.5 text-neutral-800 dark:text-zinc-200">รายละเอียดข้อความ</TableHead>
                  <TableHead className="font-bold py-3.5 text-neutral-800 dark:text-zinc-200">วันที่ส่ง</TableHead>
                  <TableHead className="font-bold py-3.5 text-right text-neutral-800 dark:text-zinc-200">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow
                    key={inquiry.id}
                    className="border-neutral-200 dark:border-neutral-800/80 hover:bg-neutral-50/40 dark:hover:bg-zinc-900/10 transition-colors"
                  >
                    <TableCell className="align-middle py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-800/70 border border-neutral-200/50 dark:border-zinc-800 flex items-center justify-center text-neutral-600 dark:text-zinc-400">
                          <User className="w-4 h-4" />
                          {!inquiry.isRead && (
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border border-white dark:border-zinc-900 rounded-full animate-pulse" />
                          )}
                        </div>
                        <span className={cn(
                          "block transition-colors",
                          !inquiry.isRead
                            ? "font-extrabold text-neutral-950 dark:text-zinc-50"
                            : "font-semibold text-neutral-500 dark:text-zinc-400"
                        )}>
                          {inquiry.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="align-middle py-4">
                      <div className="flex flex-col gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                        {inquiry.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>{inquiry.email}</span>
                          </div>
                        )}
                        {inquiry.phone ? (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>{inquiry.phone}</span>
                          </div>
                        ) : (
                          !inquiry.email && <span className="text-zinc-400 font-italic">ไม่มีข้อมูล</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="align-middle py-4 max-w-[280px] md:max-w-md">
                      <p className="text-sm text-neutral-700 dark:text-zinc-300 line-clamp-1">
                        {inquiry.message}
                      </p>
                    </TableCell>
                    <TableCell className="align-middle py-4 text-xs text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>
                          {new Date(inquiry.createdAt).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right align-middle py-4">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleViewInquiry(inquiry)}
                          className="hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-600 dark:text-zinc-400 h-8 w-8 cursor-pointer"
                          title="ดูรายละเอียดข้อความ"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setInquiryToDelete(inquiry)}
                          className="hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 text-zinc-400 h-8 w-8 cursor-pointer"
                          title="ลบข้อความ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* 3. Detailed View Dialog Modal */}
      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <DialogContent className="sm:max-w-lg bg-popover text-popover-foreground rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-neutral-100 hover:bg-neutral-100 text-neutral-800 dark:bg-zinc-800 dark:hover:bg-zinc-800 dark:text-zinc-300 border-none font-bold rounded-md flex items-center gap-1 w-fit text-xs px-2.5 py-1">
                <MessageSquare className="w-3 h-3 text-zinc-400" />
                <span>ข้อความติดต่อสอบถาม</span>
              </Badge>
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 pt-2">
              จากคุณ: {selectedInquiry?.name}
            </DialogTitle>
            <DialogDescription className="text-zinc-500 dark:text-zinc-400 text-xs">
              ส่งเมื่อ: {selectedInquiry && new Date(selectedInquiry.createdAt).toLocaleString("th-TH")}
            </DialogDescription>
          </DialogHeader>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-neutral-100 dark:border-neutral-800 my-2">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                อีเมลสำหรับติดต่อกลับ
              </span>
              <div className="flex items-center gap-2 text-sm text-neutral-800 dark:text-zinc-200">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                {selectedInquiry?.email ? (
                  <a href={`mailto:${selectedInquiry.email}`} className="underline hover:text-neutral-600 dark:hover:text-zinc-300">
                    {selectedInquiry.email}
                  </a>
                ) : (
                  <span className="text-zinc-400 font-italic">ไม่ได้ระบุ</span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                เบอร์โทรศัพท์
              </span>
              <div className="flex items-center gap-2 text-sm text-neutral-800 dark:text-zinc-200">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                {selectedInquiry?.phone ? (
                  <a href={`tel:${selectedInquiry.phone}`} className="underline hover:text-neutral-600 dark:hover:text-zinc-300">
                    {selectedInquiry.phone}
                  </a>
                ) : (
                  <span className="text-zinc-400 font-italic">ไม่ได้ระบุ</span>
                )}
              </div>
            </div>
          </div>

          {/* Full Message Box */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
              รายละเอียดเรื่องที่สอบถาม
            </span>
            <div className="rounded-xl border border-neutral-200/50 dark:border-zinc-800/80 bg-neutral-50/50 dark:bg-zinc-950/40 p-4 min-h-[140px] max-h-[300px] overflow-y-auto">
              <p className="text-sm leading-relaxed text-neutral-800 dark:text-zinc-200 whitespace-pre-wrap">
                {selectedInquiry?.message}
              </p>
            </div>
          </div>

          <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setSelectedInquiry(null)}
              className="sm:w-28 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg h-10 cursor-pointer"
            >
              ปิดหน้าต่าง
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. Delete Confirmation Dialog Modal */}
      <AlertDialog open={!!inquiryToDelete} onOpenChange={(open) => !open && setInquiryToDelete(null)}>
        <AlertDialogContent className="sm:max-w-md border border-neutral-200 dark:border-neutral-800 bg-popover p-6 rounded-2xl shadow-2xl">
          <AlertDialogHeader className="space-y-2">
            <AlertDialogMedia className="bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </AlertDialogMedia>
            <AlertDialogTitle className="text-lg font-bold text-neutral-900 dark:text-zinc-50">
              ยืนยันการลบข้อความนี้?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              การดำเนินการนี้ไม่สามารถยกเลิกได้ ข้อความติดต่อของ <strong className="text-neutral-900 dark:text-zinc-200 font-bold">"{inquiryToDelete?.name}"</strong> จะถูกลบออกจากฐานข้อมูลอย่างถาวร
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4 gap-2">
            <AlertDialogCancel className="h-10 px-4 border-neutral-200 dark:border-neutral-800 font-medium rounded-lg text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 cursor-pointer">
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg h-10 px-4 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังลบ...</span>
                </>
              ) : (
                "ยืนยันการลบ"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
