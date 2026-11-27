export default defineResuxPlugin((app) => {
  app.provide("examplePlugin", "plugins/example.ts loaded");
});
