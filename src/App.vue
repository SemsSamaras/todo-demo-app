<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationMain from '@/components/NavigationHeader.vue'
</script>

<template>
  <header>
    <NavigationMain class="centered" />
  </header>
  <main class="centered">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  z-index: $z-index-header;

  background-color: $color-background-header;
  border-bottom: 1px $color-grey solid;
}
main {
  padding-top: $space-default;
}
</style>
