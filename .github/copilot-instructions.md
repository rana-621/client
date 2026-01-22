# Copilot / AI Agent Instructions — Client (Angular SSR)

This repository is an Angular 19 application set up for server-side rendering (SSR) using `@angular/ssr` and an Express-based server. The notes below prioritise immediate, actionable knowledge for an AI coding agent working in this codebase.

1) Big picture
- **Architecture:** Angular app (browser entry) + Angular SSR server (Express). Browser bootstrap: [src/main.ts](src/main.ts). Server entry: [src/server.ts](src/server.ts). The server uses `AngularNodeAppEngine` from `@angular/ssr/node` to render pages server-side and serves static assets from the compiled browser output.
- **Build outputs:** `ng build` produces `dist/` artifacts. The SSR server bundle expected by the project is `dist/client/server/server.mjs` (see `package.json` script `serve:ssr:client`).

2) Common developer workflows (concrete commands)
- Start dev server (client): `ng serve` (also `npm start`). See `package.json` `start` script.
- Run unit tests: `ng test` (Karma).
- Build for production: `ng build` (client/browser). For SSR, build steps that create `dist/client/server` must run before running the server bundle; the repo includes `serve:ssr:client` which assumes `dist` exists and runs `node dist/client/server/server.mjs`.
- Run SSR server bundle: `node dist/client/server/server.mjs`. The server is ESM (uses `import.meta.url`) so `server.mjs` is the required extension and requires a compatible Node version (Node 18+ recommended).

3) Key files to inspect when changing behavior
- Server routing & SSR implementation: [src/server.ts](src/server.ts) — look here for Express routes, static file serving, and Angular SSR handling (AngularNodeAppEngine, writeResponseToNodeResponse).
- Browser bootstrap: [src/main.ts](src/main.ts) — client-side entry for hydration.
- App wiring and hydration: [src/app/app.module.ts](src/app/app.module.ts) — uses `provideClientHydration(withEventReplay())`; preserve this pattern when changing app bootstrap/providers.
- Build config: [angular.json](angular.json) and [package.json](package.json) — scripts and architecture decisions (see `serve:ssr:client`).

4) Project-specific patterns and gotchas
- SSR uses `@angular/ssr/node` and writes responses with `writeResponseToNodeResponse`. When implementing new server endpoints that should render the Angular app, either return through the Angular engine or call `writeResponseToNodeResponse` with the engine's response.
- Static assets served from `../browser` relative to `dist` in `src/server.ts`. Always ensure the browser build output is available at that location before starting the server bundle.
- `server.ts` conditionally starts the listener only when run as the main module (`isMainModule(import.meta.url)`). This file also exports `reqHandler` for other hosts (e.g., cloud functions) — prefer using `reqHandler` if integrating into another Node host.
- Node runtime: server entry is ESM (`.mjs`) and uses modern Node APIs (URL, path) — tests and scripts that spawn Node should use Node 18+ and set `NODE_OPTIONS` only if necessary.

5) How to make safe changes
- Small UI changes: edit components under `src/app/` and run `ng serve` to iterate.
- SSR changes: modify `src/server.ts` or server-related Angular providers. After code changes, run a full build and then `node dist/client/server/server.mjs` to validate SSR behavior.
- When updating providers or hydration, mirror patterns found in `src/app/app.module.ts` (use `provideClientHydration(withEventReplay())`).

6) Examples (where to look / quick references)
- To add an API endpoint that still uses SSR for other routes, add an Express route above the `app.use('/**', ...)` block in [src/server.ts](src/server.ts).
- To verify where the server listens and how to change port, see the `PORT` env usage in [src/server.ts](src/server.ts).
- To run the server bundle created by the Angular build, run the `serve:ssr:client` script in [package.json](package.json) or run `node dist/client/server/server.mjs` directly.

7) Agent behavior expectations
- Make minimal, focused edits. Prefer editing existing modules/files rather than large rearchitectures.
- Preserve SSR integration patterns and the `provideClientHydration` usage unless the change explicitly involves hydration.
- When adding server endpoints, ensure static asset paths and SSR handler ordering are preserved (static serve first, API routes next, Angular handler last).

If anything above is unclear or you'd like more examples (e.g., a sample SSR endpoint or a CI-friendly build sequence), tell me which area to expand and I will iterate.
