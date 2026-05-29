import { env } from "@/shared/config/env";

export class LineNotifyService {
  async sendNotification(message: string): Promise<boolean> {
    const token = env.LINE_NOTIFY_TOKEN;
    if (!token) {
      console.warn("[LINE Notify Warning] LINE_NOTIFY_TOKEN is not defined in environment. Skipping notification.");
      return false;
    }

    try {
      const response = await fetch("https://notify-api.line.me/api/notify", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ message }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[LINE Notify Error] API responded with status ${response.status}: ${errorText}`);
        return false;
      }

      console.log("[LINE Notify] Notification dispatched successfully.");
      return true;
    } catch (error) {
      console.error("[LINE Notify Error] Network error sending notification:", error);
      return false;
    }
  }
}
