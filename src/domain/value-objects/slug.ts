export class Slug {
  constructor(public readonly value: string) {
    if (!Slug.isValid(value)) {
      throw new Error("รูปแบบสลัก (Slug) ไม่ถูกต้อง");
    }
  }

  static isValid(slug: string): boolean {
    // Slugs can contain alphanumeric English, Thai characters, and single hyphens
    return /^[a-z0-9ก-๙]+(?:-[a-z0-9ก-๙]+)*$/i.test(slug) && slug.length > 0;
  }

  static create(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9ก-๙\s-]/g, "") // Keep English, numbers, Thai, spaces, and hyphens
      .replace(/[\s_]+/g, "-") // Replace spaces and underscores with single hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens
  }
}
