export default defineResuxPlugin(() => {
  if (typeof window !== "undefined") {
    console.debug("[resux] client-only plugin ready");
  }
});
