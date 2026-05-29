import nodemailer from "nodemailer";
import { env } from "@/shared/config/env";

export class EmailService {
  private getTransporter() {
    const host = env.SMTP_HOST;
    const portStr = env.SMTP_PORT;
    const user = env.SMTP_USER;
    const pass = env.SMTP_PASSWORD;

    if (!host || !user || !pass) {
      return null;
    }

    const port = portStr ? parseInt(portStr, 10) : 587;

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // True if 465, false for 587 or other ports
      auth: {
        user,
        pass,
      },
    });
  }

  async sendContactInquiryEmail(data: {
    name: string;
    email: string | null;
    phone: string | null;
    message: string;
  }): Promise<boolean> {
    const receiver = env.CONTACT_RECEIVER_EMAIL;
    const sender = env.SMTP_USER;

    if (!receiver || !sender) {
      console.warn("[Email Service Warning] SMTP configuration or contact receiver email is unconfigured. Skipping email dispatch.");
      return false;
    }

    const transporter = this.getTransporter();
    if (!transporter) {
      console.warn("[Email Service Warning] Failed to instantiate SMTP transporter. Check environment configurations.");
      return false;
    }

    // HTML Email themed around a sophisticated forest green & warm cream aesthetic
    const mailOptions = {
      from: `"Web3.0 Portal" <${sender}>`,
      to: receiver,
      subject: `[New Inquiry] Contact from ${data.name}`,
      text: `
คุณได้รับข้อความติดต่อใหม่จากลูกค้า:

ข้อมูลติดต่อ:
- ชื่อ-นามสกุล: ${data.name}
- เบอร์โทรศัพท์: ${data.phone || "ไม่ได้ระบุ"}
- อีเมล: ${data.email || "ไม่ได้ระบุ"}

รายละเอียดข้อความ:
${data.message}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inquiry Received</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f7f9f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td align="center" style="padding: 40px 10px 40px 10px; background-color: #f7f9f6;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e1e7e0; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
                  
                  <!-- HEADER -->
                  <tr>
                    <td align="center" style="padding: 40px 40px 30px 40px; background: linear-gradient(135deg, #14361f, #225a35); color: #ffffff;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; line-height: 32px;">
                        มีข้อความติดต่อใหม่เข้ามา
                      </h1>
                      <p style="margin: 8px 0 0 0; font-size: 14px; color: #a3c9a8; font-weight: 500;">
                        Inquiry Received via Website Contact Form
                      </p>
                    </td>
                  </tr>

                  <!-- BODY CONTENT -->
                  <tr>
                    <td style="padding: 40px 40px 30px 40px;">
                      <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #4b5563;">
                        แอดมินตรวจพบบันทึกการติดต่อใหม่เข้ามาในระบบรายละเอียดด้านล่างนี้:
                      </p>

                      <!-- DETAILS TABLE -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; border-collapse: separate; border-spacing: 0;">
                        <tr>
                          <td style="padding: 12px 16px; width: 140px; font-size: 13px; font-weight: 600; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #f3f4f6; background-color: #fcfdfe;">
                            ชื่อ-นามสกุล:
                          </td>
                          <td style="padding: 12px 16px; font-size: 14px; color: #111827; font-weight: 500; border-bottom: 1px solid #f3f4f6; background-color: #fcfdfe;">
                            ${data.name}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #f3f4f6;">
                            เบอร์โทรศัพท์:
                          </td>
                          <td style="padding: 12px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #f3f4f6;">
                            ${data.phone ? `<a href="tel:${data.phone}" style="color: #225a35; text-decoration: none; font-weight: 500;">${data.phone}</a>` : '<span style="color: #9ca3af; font-style: italic;">ไม่ได้ระบุ</span>'}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #f3f4f6; background-color: #fcfdfe;">
                            อีเมล:
                          </td>
                          <td style="padding: 12px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #f3f4f6; background-color: #fcfdfe;">
                            ${data.email ? `<a href="mailto:${data.email}" style="color: #225a35; text-decoration: none; font-weight: 500;">${data.email}</a>` : '<span style="color: #9ca3af; font-style: italic;">ไม่ได้ระบุ</span>'}
                          </td>
                        </tr>
                      </table>

                      <!-- MESSAGE BLOCK -->
                      <div style="padding: 24px; background-color: #fafbf9; border-left: 4px solid #225a35; border-radius: 8px; border-top: 1px solid #f0f4f0; border-right: 1px solid #f0f4f0; border-bottom: 1px solid #f0f4f0;">
                        <span style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #225a35; margin-bottom: 12px; letter-spacing: 0.5px;">รายละเอียด / ข้อความ</span>
                        <p style="margin: 0; font-size: 14px; line-height: 24px; color: #374151; white-space: pre-wrap;">${data.message}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- ACTION BUTTON -->
                  <tr>
                    <td align="center" style="padding: 0 40px 40px 40px;">
                      <table border="0" cellpadding="0" cellspacing="0" style="margin-top: 10px;">
                        <tr>
                          <td align="center" style="border-radius: 8px; background-color: #225a35;">
                            <a href="${env.DATABASE_URL.includes("localhost") ? "http://localhost:3000/admin/contacts" : "https://web3-portal.com/admin/contacts"}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; letter-spacing: 0.2px;">
                              เปิดระบบหลังบ้านเพื่อจัดการ
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td align="center" style="padding: 24px 40px; background-color: #fbfcfb; border-top: 1px solid #f0f4f0; color: #9ca3af; font-size: 12px;">
                      <p style="margin: 0;">ข้อความฉบับนี้จัดส่งโดยระบบอัตโนมัติของ Web3.0 Portal</p>
                      <p style="margin: 4px 0 0 0;">&copy; 2026 Web3.0 Company. All rights reserved.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("[Email Service] Email notification dispatched successfully.");
      return true;
    } catch (error) {
      console.error("[Email Service Error] Failed to route SMTP email:", error);
      return false;
    }
  }
}
