<script setup lang="ts">
const cart = useGlobalState<number[]>("cart", () => [])
const cartCount = computed(() => cart.value.length)
</script>

<template>
  <div class="shell">
    <header class="nav">
      <ResuxLink to="/">Showcase shop</ResuxLink>
      <nav>
        <ResuxLink to="/">Home</ResuxLink>
        <ResuxLink to="/products">Products</ResuxLink>
        <ResuxLink to="/cart">Cart (<span id="cart-count">{{ cartCount }}</span>)</ResuxLink>
        <ResuxLink to="/about">About</ResuxLink>
      </nav>
    </header>
    <slot />
  </div>
</template>
