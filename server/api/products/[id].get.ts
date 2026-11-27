export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, "id"))
  const product = catalog.find((entry) => entry.id === id)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" })
  }
  return product
})
