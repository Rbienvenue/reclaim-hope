'use server'

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyCredentials,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  checkRateLimit,
  recordFailedAttempt,
  recordSuccessfulLogin,
} from "@/lib/auth";

export interface LoginActionResult {
  success: boolean;
  error?: string;
}

export async function loginAction(
  prevState: LoginActionResult | null,
  formData: FormData
): Promise<LoginActionResult> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { success: false, error: "Please enter both username and password." };
  }

  // Get client IP for rate limiting
  const headerStore = await headers();
  const clientIp =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "client-default";

  // Check rate limit
  const rateLimitStatus = checkRateLimit(clientIp);
  if (!rateLimitStatus.allowed) {
    return {
      success: false,
      error: `Too many failed attempts. Please wait ${rateLimitStatus.retryAfterSeconds} seconds before trying again.`,
    };
  }

  // Verify credentials
  const verification = verifyCredentials(username, password);
  if (!verification.success) {
    const attempt = recordFailedAttempt(clientIp);
    if (attempt.locked) {
      return {
        success: false,
        error: `Account temporarily locked due to consecutive failed attempts. Try again in ${attempt.retryAfterSeconds} seconds.`,
      };
    }
    return { success: false, error: verification.error || "Invalid credentials." };
  }

  // Record success to clear rate limit
  recordSuccessfulLogin(clientIp);

  // Generate signed session token and set secure cookie
  const token = createSessionToken(username);
  await setSessionCookie(token);

  return { success: true };
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/login");
}
