import Elysia from "elysia";
import { API_V1_PREFIX } from "../lib/api";

export const healthRoute = new Elysia({ prefix: API_V1_PREFIX }).get(
  "/health",
  () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }),
);
