<script setup lang="ts">
import TaskOverview from '@/components/tasks/TaskOverview.vue'
import AddTask from '@/components/tasks/AddTask.vue'
</script>

<template>
  <Suspense>
    <TaskOverview>
      <template #add-tasks>
        <AddTask />
      </template>
      <template #heading>Your open Tasks</template>
    </TaskOverview>
  </Suspense>
</template>
