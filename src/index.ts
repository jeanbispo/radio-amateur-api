import Elysia from "elysia";
import { API_V1_PREFIX } from "./lib/api";
import { solarTerrestrialRoute } from "./routes/solar-terrestrial";
import { healthRoute } from "./routes/health";

const app = new Elysia()
  .get(API_V1_PREFIX, () => ({
    name: "Radio Amateur API",
    version: "1.0.50",
    apiVersion: "v1",
    endpoints: [
      `${API_V1_PREFIX}/health`,
      `${API_V1_PREFIX}/solar-terrestrial`,
    ],
  }))
  .use(healthRoute)
  .use(solarTerrestrialRoute);


export default app;
