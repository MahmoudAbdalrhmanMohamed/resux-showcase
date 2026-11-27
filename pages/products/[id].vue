<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData("product-" + String(route.params.id), () => $fetch<{ id: number, name: string, price: number, blurb: string }>("/api/products/" + String(route.params.id)))
const cart = useGlobalState<number[]>("cart", () => [])
function buy() { cart.value = [...cart.value, Number(route.params.id)] }
useSeoMeta({ title: data.value ? data.value.name : "Product" })
</script>

<template>
  <main class="page">
    <h1 id="pname">{{ data.name }}</h1>
    <p id="pblurb">{{ data.blurb }}</p>
    <p id="pprice">${{ data.price }}</p>
    <button id="buy" @click="buy">Buy now</button>
    <ResuxLink to="/products">Back</ResuxLink>
  </main>
</template>
