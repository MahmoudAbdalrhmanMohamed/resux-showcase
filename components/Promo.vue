<script setup lang="ts">
const props = defineProps<{ code: string }>()
const clicks = ref(0)
function tap() { clicks.value++ }
</script>

<template>
  <aside class="promo">
    <strong class="promo-code">{{ props.code }}</strong>
    <button class="promo-tap" @click="tap">{{ clicks }}</button>
  </aside>
</template>
