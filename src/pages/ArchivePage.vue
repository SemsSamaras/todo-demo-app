<script setup lang="ts">
import TaskOverview from '@/components/tasks/TaskOverview.vue'
</script>

<template>
  <Suspense>
    <TaskOverview archive-page>
      <template #heading>Your completed Tasks</template>
    </TaskOverview>
  </Suspense>
</template>
