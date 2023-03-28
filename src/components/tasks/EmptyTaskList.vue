<script setup lang="ts">
import IconEmpty from '@/components/icons/IconEmpty.vue'
import { computed } from 'vue'

const props = defineProps<{
  noSearchResults: boolean
}>()

const note = computed<string>(() =>
  props.noSearchResults ? 'The search has not found any matches' : 'No tasks available'
)
</script>

<template>
  <div class="empty-task-list">
    <IconEmpty class="icon-empty"></IconEmpty>
    <p>{{ note }}</p>
  </div>
</template>

<style scoped lang="scss">
.empty-task-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  .icon-empty {
    height: 100px;
    fill: $color-text-soft;
  }
  p {
    font-weight: bold;
    color: $color-text-soft;
  }
}
</style>
