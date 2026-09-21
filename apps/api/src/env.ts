import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
    AUTH_GITHUB_ID: z.string().min(1, "AUTH_GITHUB_ID is required"),
    AUTH_GITHUB_SECRET: z.string().min(1, "AUTH_GITHUB_SECRET is required"),
    ADMIN_GITHUB_IDS: z.string().default(""),
    WEB_ORIGIN: z.string().url().default("http://localhost:5173"),
    STORAGE_DIR: z.string().min(1).default("./storage"),
    GITHUB_WEBHOOK_SECRET: z.string().default(""),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    ADMIN_GITHUB_IDS: process.env.ADMIN_GITHUB_IDS,
    WEB_ORIGIN: process.env.WEB_ORIGIN,
    STORAGE_DIR: process.env.STORAGE_DIR,
    GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
