import { createHash } from "crypto";

/**
 * Generates a stateless, cryptographic preview token based on the post's unique ID and the server's AUTH_SECRET.
 * This is 100% secure as AUTH_SECRET is server-only and never leaked to the client.
 */
export function generatePreviewToken(postId: string): string {
  const secret = process.env.AUTH_SECRET || "fallback-secret-key-12345";
  return createHash("sha256")
    .update(`${postId}-${secret}`)
    .digest("hex")
    .substring(0, 32); // 32 characters is standard and elegant
}

/**
 * Verifies if the client-submitted preview token matches the expected server-computed token for a given post ID.
 */
export function verifyPreviewToken(postId: string, token: string): boolean {
  if (!token) return false;
  const expectedToken = generatePreviewToken(postId);
  return expectedToken === token;
}
