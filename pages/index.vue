<script setup lang="ts">
const count = ref(0)
const showPromo = ref(false)
const code = ref("SPRING")
const { data } = await useAsyncData("home-products", () => $fetch<{ id: number, name: string, price: number, blurb: string }[]>("/api/products"))
const featured = computed(() => (data.value ?? []).slice(0, 2))
const cart = useGlobalState<number[]>("cart", () => [])
function inc() { count.value++ }
function togglePromo() { showPromo.value = !showPromo.value }
function nextCode() { code.value = code.value === "SPRING" ? "SUMMER" : "SPRING" }
function addToCart(id) { cart.value = [...cart.value, id] }
useSeoMeta({ title: "Showcase shop", description: "End-to-end Resux showcase." })
</script>

<template>
  <main class="page">
    <h1 id="title">Showcase shop</h1>
    <p>Server rendered, resumable.</p>
    <button id="inc" @click="inc">Clicked {{ count }}</button>
    <button id="promo-toggle" @click="togglePromo">Toggle promo</button>
    <button id="promo-code" @click="nextCode">Next code</button>
    <div id="promo-box"><Promo v-if="showPromo" :code="code" /></div>
    <div id="featured"><Panel>
      <template #header>Featured ({{ featured.length }})</template>
      <ProductCard v-for="p in featured" :key="p.id" :name="p.name" :price="p.price" :blurb="p.blurb" @add="addToCart(p.id)">
        <template #actions="{ price }">
          <Pill>{{ price > 50 ? "premium" : "value" }}</Pill>
        </template>
      </ProductCard>
      <template #footer>2 shown</template>
    </Panel></div>
  </main>
</template>
