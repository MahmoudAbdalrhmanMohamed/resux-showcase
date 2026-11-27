export default defineResuxRouteMiddleware((to, from) => {
  if (to.path === from.path) {
    return;
  }
  console.debug("[resux] analytics", { from: from.path, to: to.path });
});
