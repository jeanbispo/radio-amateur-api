# Radio Amateur API

API generalista para radioamadores. Consome, transforma e disponibiliza dados relevantes para a prática do radioamadorismo.

## Recursos

| Recurso | Rota | Origem dos Dados |
|---------|------|------------------|
| Solar Terrestrial Data | `GET /solar-terrestrial-data` | [Paul - N0NBH](https://www.hamqsl.com/solar.html) |
| Health Check | `GET /health` | Interno |

## Solar Terrestrial Data

Retorna JSON derivado do XML upstream com dados de atividade solar e condições de propagação de radio.

**Exemplo de uso:**

```bash
curl https://<your-domain>/solar-terrestrial-data
```

## Health Check

Retorna o status da API e o timestamp atual.

```bash
curl https://<your-domain>/health
```

## Estrutura do Projeto

```
src/
├── index.ts                        # Entry point — exporta o app
├── app.ts                          # Configuração do Elysia e registro de rotas
├── lib/
│   └── cache.ts                    # Utilitários de cache (getCache/setCache)
├── services/
│   └── solar-terrestrial.ts        # Lógica de fetch e parsing do upstream
└── routes/
    ├── health.ts                   # Rota GET /health
    └── solar-terrestrial.ts        # Rota GET /solar-terrestrial-data
```

## Cache

Duas camadas de cache evitam hits desnecessários ao upstream:

| Camada | Mecanismo | TTL |
|--------|-----------|-----|
| **CDN** | `Cache-Control: public, s-maxage=3600, stale-while-revalidate=600` | 1 h no edge Vercel, +10 min stale |
| **Runtime** | [`@vercel/functions`](https://vercel.com/docs/caching/runtime-cache) — `getCache()` com TTL de 3600 s | 1 h (persistido pela infraestrutura Vercel) |

O cache de runtime usa a API oficial de Runtime Cache da Vercel (`getCache` do pacote `@vercel/functions`), que persiste entre cold starts ao contrário de cache em memória. O cache CDN cobre a camada compartilhada no edge.

## Development

```bash
bun i
vc dev
```

```bash
open http://localhost:3000/solar-terrestrial-data
```

## Deploy

```bash
vc deploy
```
