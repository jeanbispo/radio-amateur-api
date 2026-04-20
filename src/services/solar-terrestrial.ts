import { XMLParser } from "fast-xml-parser";
import { getCached, setCache } from "../lib/cache";

const UPSTREAM_URL = "https://www.hamqsl.com/solarxml.php";
const CACHE_KEY = "solar-terrestrial-data";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  textNodeName: "value",
  isArray: (name) => name === "band" || name === "phenomenon",
});

export async function fetchSolarData(): Promise<unknown> {
  const cached = await getCached<unknown>(CACHE_KEY);
  if (cached) return cached;

  const response = await fetch(UPSTREAM_URL);

  if (!response.ok) {
    throw new Error(`Upstream returned ${response.status}`);
  }

  const xml = await response.text();
  const parsed = parser.parse(xml);
  const data = parsed?.solar ?? parsed;

  await setCache(CACHE_KEY, data);
  return data;
}
