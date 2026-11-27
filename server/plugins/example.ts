import { defineNitroPlugin } from "nitropack/runtime/plugin";

export default defineNitroPlugin(() => {
  console.debug("[resux] nitro plugin booted");
});
