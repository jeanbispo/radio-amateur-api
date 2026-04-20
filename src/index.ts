import Elysia from "elysia";
import { solarTerrestrialRoute } from "./routes/solar-terrestrial";
import { healthRoute } from "./routes/health";

const app = new Elysia()
  .get("/", () => ({
    name: "Radio Amateur API",
    version: "1.0.50",
    endpoints: ["/health", "/solar-terrestrial-data"],
  }))
  .use(healthRoute)
  .use(solarTerrestrialRoute);


export default app;