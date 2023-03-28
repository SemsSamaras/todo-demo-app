<script setup lang="ts">
import { Task } from '@/components/Task'
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import IconCopy from '@/components/icons/IconCopy.vue'
import IconCopyDone from '@/components/icons/IconCopyDone.vue'
import useClipboard from 'vue-clipboard3'

const props = defineProps<{
  task: Task
}>()

const tasksStore = useTasksStore()
const { toClipboard } = useClipboard()

const isCompleted = ref<boolean>(props.task.completed)

function toggleTask(): void {
  setTimeout(() => {
    isCompleted.value ? tasksStore.archiveTask(props.task.id) : tasksStore.reopenTask(props.task.id)
  }, 200)
}

const copyTriggered = ref<boolean>(false)
const copyToClipboard = async () => {
  try {
    copyTriggered.value = true
    await toClipboard(props.task.title)
  } catch (e) {
    console.error(e)
  } finally {
    setTimeout(() => {
      copyTriggered.value = false
    }, 1000)
  }
}
</script>

<template>
  <div :class="['card-list-item', { completed: isCompleted }]">
    <input
      type="checkbox"
      :id="props.task.id.toString()"
      :checked="isCompleted"
      v-model="isCompleted"
      @input="toggleTask"
    />
    <label :for="props.task.id.toString()">{{ props.task.title }}</label>
    <div class="icon">
      <IconCopy class="copy" @click="copyToClipboard" v-if="!copyTriggered" />
      <IconCopyDone class="done" v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-list-item {
  background-color: $color-background-card;
  padding: 1rem;

  display: flex;
  align-items: center;
  gap: 1.1rem;

  border: 2px $color-grey solid;
  border-radius: $border-radius-default;
  transition: 0.2s ease;

  @media (hover: hover) {
    &:hover {
      border-color: $color-accent;
      label {
        text-decoration: line-through;
      }
    }
  }

  &.completed {
    &:hover {
      border-color: $color-completed;
    }
    accent-color: $color-completed;
    label {
      text-decoration: line-through;
      @media (hover: hover) {
        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  input[type='checkbox'] {
    padding: 10px;
  }

  input,
  label,
  .icon {
    cursor: pointer;
  }

  label {
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: pre-wrap;
  }

  .icon {
    align-self: flex-start;
    .copy,
    .done {
      height: $font-size-default;
      fill: $color-text-soft;
    }
  }
}
</style>
