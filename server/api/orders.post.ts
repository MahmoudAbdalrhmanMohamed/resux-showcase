export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; total?: number; lines?: number }>(event)
  if (!body?.email || !String(body.email).includes("@")) {
    throw createError({ statusCode: 400, statusMessage: "A valid email is required" })
  }
  return { ok: true, orderId: "A-" + String(Math.round(Number(body.total ?? 0) * 7)).padStart(4, "0"), lines: body.lines ?? 0 }
})
