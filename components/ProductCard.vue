<script setup lang="ts">
const props = defineProps<{ name: string, price: number, blurb: string }>()
const emit = defineEmits(["add"])
const added = ref(0)
function add() {
  added.value++
  emit("add")
}
</script>

<template>
  <article class="card">
    <h3>{{ props.name }}</h3>
    <p class="blurb">{{ props.blurb }}</p>
    <p class="price">${{ props.price }}</p>
    <div class="row">
      <button class="add" @click="add">Add ({{ added }})</button>
      <slot name="actions" :price="props.price">
        <span class="muted">no extras</span>
      </slot>
    </div>
  </article>
</template>
