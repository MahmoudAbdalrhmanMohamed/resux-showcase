import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const method = event.node.req.method ?? "GET";
  const path = event.node.req.url ?? "/";
  console.debug("[resux] request", method, path);
});
