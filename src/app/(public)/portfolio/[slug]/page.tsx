import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, Briefcase, Tag, ArrowLeft, MessageSquare, FolderOpen } from "lucide-react";

import { container } from "@/infrastructure/di/container";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const project = await container.getProjectBySlug.execute(decodedSlug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description.substring(0, 150),
    openGraph: {
      title: project.title,
      description: project.description.substring(0, 150),
      images: project.coverImage ? [project.coverImage] : [],
    },
  };
}

export default async function PublicProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // Retrieve project
  const project = await container.getProjectBySlug.execute(decodedSlug);

  if (!project || project.status !== "PUBLISHED") {
    notFound();
  }

  // Retrieve other published projects for related recommendations
  const allProjects = await container.listProjects.execute({ status: "PUBLISHED", page: 1, limit: 10 });
  const relatedProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  // Safely parse JSON images if returned as string from database driver
  let parsedImages: string[] = [];
  if (project.images) {
    if (typeof project.images === "string") {
      try {
        parsedImages = JSON.parse(project.images);
      } catch (e) {
        parsedImages = [];
      }
    } else if (Array.isArray(project.images)) {
      parsedImages = project.images;
    }
  }

  // SEO structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "image": parsedImages,
    "description": project.description,
    "creator": {
      "@type": "Organization",
      "name": "บริการงานพิมพ์ครบวงจร",
    },
  };

  return (
    <div className="w-full flex flex-col items-center bg-zinc-50/20 dark:bg-zinc-950/20 pb-20 font-sans">
      {/* JSON-LD Structured Data */}
      <script
        id={`portfolio-ld-${project.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full mt-8 space-y-8">
        {/* 1. Breadcrumbs & Back Button */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-zinc-200">หน้าแรก</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-neutral-900 dark:hover:text-zinc-200">ผลงานทั้งหมด</Link>
          <span>/</span>
          <span className="text-zinc-500 dark:text-zinc-400 line-clamp-1">{project.title}</span>
        </div>

        {/* 2. Headline & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Title & Description (Left pane) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              {project.category && (
                <Badge className="bg-neutral-950 text-white dark:bg-zinc-100 dark:text-black border-none font-bold rounded-lg px-2.5 py-1 text-xs">
                  {project.category}
                </Badge>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight leading-tight sm:leading-snug">
                {project.title}
              </h1>
            </div>

            {/* Render description in styled text container */}
            <div className="bg-white dark:bg-black border border-neutral-200/50 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="font-extrabold text-lg text-neutral-900 dark:text-zinc-100 mb-4 border-b border-neutral-100 dark:border-zinc-800/60 pb-3">
                รายละเอียดเกี่ยวกับผลงานผลิต
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line text-base font-medium">
                {project.description}
              </p>
            </div>
          </div>

          {/* Project Details Card (Right pane) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-black border border-neutral-200/50 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-neutral-900 dark:text-zinc-100 border-b border-neutral-100 dark:border-zinc-800/60 pb-3">
                ข้อมูลสรุปโครงการผลิต
              </h3>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-bold uppercase tracking-wider">แบรนด์ลูกค้า (Client)</span>
                    <span className="text-sm font-extrabold text-neutral-900 dark:text-zinc-200 mt-0.5 block">{project.client || "แบรนด์ทั่วไป"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-bold uppercase tracking-wider">ประเภทสื่อสิ่งพิมพ์</span>
                    <span className="text-sm font-extrabold text-neutral-900 dark:text-zinc-200 mt-0.5 block">{project.category || "-"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-bold uppercase tracking-wider">วันที่ผลิตสำเร็จ</span>
                    <span className="text-sm font-extrabold text-neutral-900 dark:text-zinc-200 mt-0.5 block">
                      {project.date ? new Date(project.date).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                      }) : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. High-Fidelity Gallery Grid */}
        {parsedImages && parsedImages.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
              รูปภาพรายละเอียดชิ้นงานจริง ({parsedImages.length} รูป)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parsedImages.map((imgUrl, index) => (
                <div
                  key={index}
                  className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-zinc-800/80 bg-neutral-100 dark:bg-zinc-900 shadow-md transition-shadow hover:shadow-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`${project.title} detail ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CTA Consultation Banner */}
        <div className="bg-neutral-900 dark:bg-zinc-950 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-transparent to-transparent opacity-40 dark:from-zinc-900" />
          <div className="space-y-2 text-center md:text-left relative z-10">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
              สนใจผลิตงานพิมพ์แบบโครงการนี้?
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xl">
              ปรึกษาและออกแบบงานผลิตเสื้อผ้า แบรนด์สิ่งพิมพ์ของคุณกับผู้ชำนาญการฟรี พร้อมบริการขึ้นตัวอย่างชิ้นงานจริงฟรี!
            </p>
          </div>
          <Button
            asChild
            className="bg-white hover:bg-neutral-100 text-neutral-900 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-bold px-6 py-5 rounded-xl shadow-md shrink-0 flex items-center gap-1.5 relative z-10"
          >
            <Link href="/contact">
              <MessageSquare className="w-4 h-4" />
              <span>ขอใบเสนอราคาด่วน</span>
            </Link>
          </Button>
        </div>

        {/* 5. Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
              ประวัติผลงานชิ้นงานอื่นๆ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rProj) => (
                <Link
                  key={rProj.id}
                  href={`/portfolio/${rProj.slug}`}
                  className="group flex flex-col bg-white dark:bg-black border border-neutral-200/50 dark:border-zinc-800/80 hover:border-neutral-300 dark:hover:border-zinc-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-zinc-900 relative">
                    {rProj.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={rProj.coverImage}
                        alt={rProj.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <FolderOpen className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <h4 className="font-extrabold text-neutral-900 dark:text-zinc-100 text-sm group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-2 leading-snug">
                      {rProj.title}
                    </h4>
                    {rProj.client && (
                      <span className="text-[11px] text-zinc-400 block mt-1">
                        ลูกค้า: {rProj.client}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="pt-6 text-center">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-zinc-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg"
          >
            <Link href="/portfolio" className="flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าหลักผลงานทั้งหมด</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
