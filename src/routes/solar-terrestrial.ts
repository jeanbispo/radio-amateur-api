import Elysia from "elysia";
import { fetchSolarData } from "../services/solar-terrestrial";

export const CDN_CACHE_CONTROL =
  "public, s-maxage=3600, stale-while-revalidate=600";

export const solarTerrestrialRoute = new Elysia().get(
  "/solar-terrestrial",
  async () => {
    try {
      const data = await fetchSolarData();
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": CDN_CACHE_CONTROL,
        },
      });
    } catch {
      return new Response(
        JSON.stringify({ error: "Failed to fetch solar data" }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
);
