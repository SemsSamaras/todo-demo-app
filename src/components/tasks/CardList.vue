<script setup lang="ts">
import CardListItem from '@/components/tasks/CardListItem.vue'
import { Task } from '@/components/Task'

const props = defineProps<{
  tasks: Task[]
}>()
</script>

<template>
  <div class="card-list">
    <CardListItem v-for="task in props.tasks" :key="task.id" :task="task" />
  </div>
</template>

<style scoped lang="scss">
.card-list {
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  grid-auto-rows: $card-height;
  gap: $space-default;
}
</style>
