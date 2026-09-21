import { env } from "./env";

export type AppEnv = typeof env;

export function getEnv(): AppEnv {
  return env;
}

let cachedAdminIds: ReadonlySet<number> | null = null;

export function getAdminGithubIds(): ReadonlySet<number> {
  if (cachedAdminIds === null) {
    const raw = env.ADMIN_GITHUB_IDS ?? "";
    const ids = new Set<number>();
    for (const entry of raw.split(",")) {
      const trimmed = entry.trim();
      if (trimmed.length === 0) {
        continue;
      }
      if (!/^\d+$/.test(trimmed)) {
        throw new Error(`ADMIN_GITHUB_IDS contains a non-numeric entry: "${trimmed}"`);
      }
      const value = Number(trimmed);
      if (!Number.isSafeInteger(value) || value <= 0) {
        throw new Error(`ADMIN_GITHUB_IDS contains an invalid GitHub id: "${trimmed}"`);
      }
      ids.add(value);
    }
    cachedAdminIds = ids;
  }
  return cachedAdminIds;
}

export function isAdminGithubId(githubId: number): boolean {
  return getAdminGithubIds().has(githubId);
}
