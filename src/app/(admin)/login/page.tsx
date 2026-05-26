"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock, Mail } from "lucide-react";

import { loginSchema, type LoginInput } from "@/application/dto/auth.dto";
import { loginAction } from "@/presentation/actions/auth.actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/components/ui/form";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const res = await loginAction(data);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("เข้าสู่ระบบสำเร็จ กำลังนำทางไปยังแผงควบคุม...");
      router.push("/admin");
      router.refresh();
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-neutral-50 via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-neutral-900 dark:to-zinc-900">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-zinc-500/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md border border-neutral-200/50 bg-white/70 dark:bg-black/50 dark:border-neutral-800/50 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-primary/5">
        <CardHeader className="space-y-2 text-center pt-8">
          <div className="mx-auto w-12 h-12 bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105">
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight mt-4">
            ระบบจัดการหลังบ้าน
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลระบบ
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-5 px-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium">อีเมล</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                      <FormControl>
                        <Input
                          placeholder="admin@example.com"
                          type="email"
                          className="pl-10 h-11 border-neutral-200 dark:border-neutral-800/80 bg-white/50 dark:bg-black/30 focus-visible:ring-1 focus-visible:ring-neutral-400"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium">รหัสผ่าน</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                      <FormControl>
                        <Input
                          placeholder="••••••••••••"
                          type="password"
                          className="pl-10 h-11 border-neutral-200 dark:border-neutral-800/80 bg-white/50 dark:bg-black/30 focus-visible:ring-1 focus-visible:ring-neutral-400"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pb-8 pt-4 px-6">
              <Button
                type="submit"
                className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-medium rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
