<template>
  <header class="starter-header">
    <ResuxLink to="/">Showcase</ResuxLink>
    <nav>
      <ResuxLink to="/">Home</ResuxLink>
      <ResuxLink to="/about">About</ResuxLink>
    </nav>
  </header>
</template>

<style scoped>
.starter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

nav {
  display: inline-flex;
  gap: 0.75rem;
}
</style>
