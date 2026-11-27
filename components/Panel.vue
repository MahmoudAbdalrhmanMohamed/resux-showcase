<template>
  <section class="panel">
    <header class="panel-head"><slot name="header">Panel</slot></header>
    <div class="panel-body"><slot /></div>
    <footer class="panel-foot"><slot name="footer">end</slot></footer>
  </section>
</template>
