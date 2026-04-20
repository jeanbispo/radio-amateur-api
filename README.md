# Radio Amateur API

General-purpose API for amateur radio operators. It consumes, transforms, and exposes data relevant to amateur radio operations.

## Features

| Feature | Route | Data Source |
|---------|-------|-------------|
| API Info | `GET /api/v1` | Internal |
| Solar Terrestrial Data | `GET /api/v1/solar-terrestrial` | [Paul - N0NBH](https://www.hamqsl.com/solar.html) |
| Health Check | `GET /api/v1/health` | Internal |

## API Versioning

The API currently exposes versioned routes only under `v1`.

- Base path: `GET /api/v1`
- Health check: `GET /api/v1/health`
- Solar terrestrial data: `GET /api/v1/solar-terrestrial`

## API Info

Returns API metadata, current application version, and the list of available `v1` endpoints.

```bash
curl https://<your-domain>/api/v1
```

## Solar Terrestrial Data

Returns JSON derived from the upstream XML with solar activity and radio propagation data.

**Usage example:**

```bash
curl https://<your-domain>/api/v1/solar-terrestrial
```

## Health Check

Returns the API status and the current timestamp.

```bash
curl https://<your-domain>/api/v1/health
```

## Project Structure

```
src/
├── index.ts                        # Entry point — exports the app
├── lib/
│   ├── api.ts                      # Shared API version prefix
│   └── cache.ts                    # Cache utilities (getCache/setCache)
├── services/
│   └── solar-terrestrial.ts        # Upstream fetch and parsing logic
└── routes/
    ├── health.ts                   # GET /api/v1/health route
    └── solar-terrestrial.ts        # GET /api/v1/solar-terrestrial route
```

## Cache

Two cache layers avoid unnecessary hits to the upstream:

| Layer | Mechanism | TTL |
|-------|-----------|-----|
| **CDN** | `Cache-Control: public, s-maxage=3600, stale-while-revalidate=600` | 1 h on the Vercel edge, +10 min stale |
| **Runtime** | [`@vercel/functions`](https://vercel.com/docs/caching/runtime-cache) — `getCache()` with a TTL of 3600 s | 1 h (persisted by the Vercel infrastructure) |

The runtime cache uses Vercel's official Runtime Cache API (`getCache` from the `@vercel/functions` package), which persists across cold starts unlike in-memory cache. The CDN cache covers the shared edge layer.

## Development

```bash
bun i
vc dev
```

```bash
open http://localhost:3000/api/v1/solar-terrestrial
```

## Deploy

```bash
vc deploy
```
