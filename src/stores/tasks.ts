import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Task } from '@/components/Task'

export const useTasksStore = defineStore('tasks', () => {
  const endpoint = 'https://jsonplaceholder.typicode.com/todos/?userId=1'

  const tasks = ref<Task[]>([])
  const sortedTasks = computed(() => tasks.value.sort((a, b) => b.id - a.id))
  const openTasks = computed(() => sortedTasks.value.filter((task: Task) => !task.completed))
  const completedTasks = computed(() => sortedTasks.value.filter((task: Task) => task.completed))

  async function fetchTasks() {
    if (tasks.value.length) {
      return
    }
    const response = await fetch(endpoint, { method: 'GET' })
    if (!response.ok) {
      throw new Error(response.status.toString())
    }
    const data = await response.json()
    data.map((task: Task) => {
      tasks.value.push(new Task(task.id, task.title, task.completed))
    })
  }

  function addTask(task: Task) {
    tasks.value.push(new Task(task.id, task.title, task.completed))
  }

  function archiveTask(taskId: number) {
    const taskToArchive = tasks.value.find((task) => task.id === taskId)
    if (taskToArchive) {
      taskToArchive.completed = true
    }
  }

  function reopenTask(taskId: number) {
    const taskToReopen = tasks.value.find((task) => task.id === taskId)
    if (taskToReopen) {
      taskToReopen.completed = false
    }
  }

  return {
    tasks,
    fetchTasks,
    openTasks,
    completedTasks,
    addTask,
    reopenTask,
    archiveTask
  }
})
