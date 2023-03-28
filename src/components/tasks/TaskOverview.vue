<script setup lang="ts">
import { computed, ref } from 'vue'
import CardList from '@/components/tasks/CardList.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { useTasksStore } from '@/stores/tasks'
import { Task } from '@/components/Task'
import EmptyTaskList from '@/components/tasks/EmptyTaskList.vue'

interface Props {
  archivePage?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  archivePage: false
})

const tasksStore = useTasksStore()
await tasksStore.fetchTasks()

const tasks = computed<Task[]>(() =>
  props.archivePage ? tasksStore.completedTasks : tasksStore.openTasks
)

const searchTerm = ref<string>('')
const filteredTasks = computed(() => filterTasks())

function filterTasks(): Task[] {
  if (searchTerm.value) {
    return tasks.value.filter((task) => {
      return task.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    })
  }
  return tasks.value
}
</script>

<template>
  <slot name="add-tasks"></slot>
  <section class="overview">
    <h3>
      <slot name="heading"></slot>
      <slot> ({{ tasks.length }})</slot>
    </h3>
    <div class="search-container">
      <input
        type="text"
        placeholder="Search for a task..."
        @input="filterTasks"
        v-model="searchTerm"
      />
      <IconSearch class="icon"></IconSearch>
    </div>
    <CardList :tasks="filteredTasks" v-if="filteredTasks.length" />
    <EmptyTaskList v-else :no-search-results="tasks.length > 0" />
  </section>
</template>

<style scoped lang="scss">
.overview {
  display: flex;
  flex-direction: column;
  gap: $space-default;

  h3 {
    font-weight: bold;
  }

  .search-container {
    input {
      @include text-field;
    }

    .icon {
      height: 25px;

      position: absolute;
      top: 8px;
      right: 12px;
      fill: $color-accent;
      @media (min-width: $breakpoint-sm) {
        left: calc($input-elements-width - 40px);
      }

      z-index: $z-index-search-icon;
    }
  }
}
</style>
