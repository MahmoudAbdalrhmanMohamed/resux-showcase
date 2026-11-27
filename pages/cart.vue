<script setup lang="ts">
const cart = useGlobalState<number[]>("cart", () => [])
const { data } = await useAsyncData("cart-products", () => $fetch<{ id: number, name: string, price: number }[]>("/api/products"))
const email = ref("")
const result = ref("")
const lines = computed(() => cart.value.map((id, index) => ({ key: index, ...(data.value ?? []).find((p) => p.id === id) })))
const total = computed(() => lines.value.reduce((sum, line) => sum + Number(line.price ?? 0), 0))
function removeLine(index) { cart.value = cart.value.filter((_, i) => i !== index) }
async function checkout() {
  try {
    const res = await $fetch<{ orderId: string }>("/api/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: email.value, total: total.value, lines: lines.value.length }) })
    result.value = "Order " + res.orderId
    cart.value = []
  } catch (error) {
    result.value = "Failed: " + String(error.statusMessage ?? error.message ?? "error")
  }
}
useSeoMeta({ title: "Cart" })
</script>

<template>
  <main class="page">
    <h1>Cart</h1>
    <p id="empty" v-if="lines.length === 0">Cart is empty</p>
    <ul id="lines">
      <li v-for="line in lines" :key="line.key"><span class="ln">{{ line.name }}</span> <button class="rm" @click="removeLine(line.key)">remove</button></li>
    </ul>
    <p id="total">Total ${{ total }}</p>
    <input id="email" v-model="email" placeholder="email" />
    <button id="checkout" @click="checkout">Checkout</button>
    <p id="result">{{ result }}</p>
  </main>
</template>
