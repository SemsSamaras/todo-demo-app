import { beforeEach, describe, expect, it } from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useTasksStore } from '@/stores/tasks'
import { Task } from '@/components/Task'

describe('Tasks Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should fetch tasks', async () => {
    const tasksStore = useTasksStore()
    expect(tasksStore.tasks.length).toBe(0)
    await tasksStore.fetchTasks()
    expect(tasksStore.tasks.length).toBeGreaterThan(0)
  })

  it('should add task', () => {
    const tasksStore = useTasksStore()
    expect(tasksStore.tasks.length).toBe(0)
    const newTask = new Task(1, 'test title', false)
    tasksStore.addTask(newTask)
    expect(tasksStore.tasks.length).toBe(1)
    const storedTask = tasksStore.tasks[0]
    expect(storedTask).toEqual(newTask)
  })

  it('should archive task', () => {
    const tasksStore = useTasksStore()
    const newTask = new Task(1, 'test title', false)
    tasksStore.addTask(newTask)
    const storedTask = tasksStore.tasks[0]
    expect(storedTask.completed).toBe(false)
    tasksStore.archiveTask(storedTask.id)
    expect(storedTask.completed).toBe(true)
  })

  it('should reopen/unarchive task', () => {
    const tasksStore = useTasksStore()
    const newTask = new Task(1, 'test title', true)
    tasksStore.addTask(newTask)
    const storedTask = tasksStore.tasks[0]
    expect(storedTask.completed).toBe(true)
    tasksStore.reopenTask(storedTask.id)
    expect(storedTask.completed).toBe(false)
  })
})
