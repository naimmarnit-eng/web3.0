import * as fs from "fs/promises";
import * as path from "path";

export class UploadService {
  private readonly uploadDir = path.join(process.cwd(), "public", "uploads");

  async validateAndSaveFile(buffer: Buffer, filename: string): Promise<string> {
    // 1. File Size Validation (Max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (buffer.length > MAX_SIZE) {
      throw new Error("ขนาดไฟล์เกินขีดจำกัดสูงสุด 10MB");
    }

    // 2. Extension & Filename Validation & Sanitization
    const ext = path.extname(filename).toLowerCase();
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
    if (!allowedExtensions.includes(ext)) {
      throw new Error("ไม่อนุญาตให้นำเข้าไฟล์ประเภทนี้ (รองรับเฉพาะ PNG, JPG, JPEG, WEBP, GIF)");
    }

    // Sanitize filename to prevent directory traversal and clean it
    const baseName = path.basename(filename, ext);
    const sanitizedBase = baseName
      .replace(/[^a-zA-Z0-9ก-๙_-]/g, "")
      .substring(0, 50); // limit name length
    const uniqueName = `${sanitizedBase}-${Date.now()}${ext}`;

    // 3. Magic Byte Header Checking (Security validation)
    const isHeaderValid = this.checkMagicBytes(buffer, ext);
    if (!isHeaderValid) {
      throw new Error("ไฟล์รูปภาพไม่ถูกต้อง (การตรวจสอบลายเซ็นไบนารีล้มเหลว)");
    }

    // 4. Ensure uploads directory exists and write file
    await fs.mkdir(this.uploadDir, { recursive: true });
    const fullPath = path.join(this.uploadDir, uniqueName);
    await fs.writeFile(fullPath, buffer);

    return `/uploads/${uniqueName}`;
  }

  private checkMagicBytes(buffer: Buffer, ext: string): boolean {
    if (buffer.length < 4) return false;

    const hex = buffer.toString("hex", 0, 4).toLowerCase();

    if (ext === ".jpg" || ext === ".jpeg") {
      // JPEG files start with FF D8 FF
      return hex.startsWith("ffd8ff");
    }
    if (ext === ".png") {
      // PNG starts with 89 50 4E 47
      return hex === "89504e47";
    }
    if (ext === ".gif") {
      // GIF starts with 47 49 46 38 (GIF8)
      return hex === "47494638";
    }
    if (ext === ".webp") {
      // WEBP starts with 52 49 46 46 (RIFF)
      return hex === "52494646";
    }

    return false;
  }
}
