<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { Task } from '@/components/Task'

const title = ref<string>('')

const tasksStore = useTasksStore()

function generateNewId(): number {
  return Math.max(...tasksStore.tasks.map((task: Task) => task.id)) + 1
}

function addTask(): void {
  if (title.value.length) {
    tasksStore.addTask(new Task(generateNewId(), title.value))
  }
  title.value = ''
}
</script>

<template>
  <section class="add-task">
    <h3>Add new Task</h3>
    <form @submit.prevent="addTask">
      <input placeholder="Enter a new task..." type="text" v-model="title" />
      <button type="submit" :class="[{ highlight: title.length }]">+ ADD</button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.add-task {
  margin-bottom: calc(2 * $space-default);

  h3 {
    font-weight: bold;
  }

  form {
    margin-top: $space-default;

    display: flex;
    flex-direction: column;
    gap: calc($space-default / 2);
    @media (min-width: $breakpoint-sm) {
      flex-direction: row;
      gap: $space-default;
    }

    input {
      @include text-field;
    }

    button {
      @include focus-visible;
      cursor: pointer;

      height: $action-elements-height;
      width: 100%;
      @media (min-width: $breakpoint-sm) {
        width: auto;
        padding: 0 1rem;
      }

      color: $color-text-default;
      background-color: $color-text-contrast;

      &:hover,
      &.highlight {
        color: $color-text-contrast;
        background-color: $color-accent;
      }

      border: 2px $color-grey solid;
      border-radius: $border-radius-default;

      font-size: inherit;
      font-weight: bold;
    }
  }
}
</style>
