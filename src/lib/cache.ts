import { getCache } from "@vercel/functions";

export const DEFAULT_TTL = 3600;

export async function getCached<T>(key: string): Promise<T | undefined> {
  const cache = getCache();
  return (await cache.get(key)) as T | undefined;
}

export async function setCache<T>(
  key: string,
  data: T,
  ttl: number = DEFAULT_TTL,
): Promise<void> {
  const cache = getCache();
  await cache.set(key, data, { ttl });
}
