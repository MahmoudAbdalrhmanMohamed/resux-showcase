<script setup lang="ts">
const { data } = await useAsyncData("products", () => $fetch<{ id: number, name: string, price: number, tag: string, blurb: string }[]>("/api/products"))
const query = ref("")
const tag = ref("all")
const cart = useGlobalState<number[]>("cart", () => [])
const visible = computed(() => (data.value ?? []).filter((p) => p.name.toLowerCase().includes(query.value.toLowerCase()) && (tag.value === "all" || p.tag === tag.value)))
function addToCart(id) { cart.value = [...cart.value, id] }
function setTag(next) { tag.value = next }
useSeoMeta({ title: "Products" })
</script>

<template>
  <main class="page">
    <h1>Products</h1>
    <input id="q" v-model="query" placeholder="Search" />
    <button id="t-all" @click="setTag('all')">all</button>
    <button id="t-kitchen" @click="setTag('kitchen')">kitchen</button>
    <button id="t-home" @click="setTag('home')">home</button>
    <p id="shown">{{ visible.length }} shown</p>
    <div id="grid">
      <ProductCard v-for="p in visible" :key="p.id" :name="p.name" :price="p.price" :blurb="p.blurb" @add="addToCart(p.id)" />
    </div>
    <ul id="links">
      <li v-for="p in visible" :key="p.id"><ResuxLink :to="'/products/' + p.id">{{ p.name }}</ResuxLink></li>
    </ul>
  </main>
</template>
