import { computed } from 'vue'
import { useStore } from 'vuex'
import { TaskStatusEnum, StatusConfig, FilterEnum } from '@/constants/tasks'

export function useTasks (currentFilter = null) {
  const store = useStore()

  const tasks = computed(() => store.state.tasks)

  const filteredTasks = computed(() => {
    if (!currentFilter || currentFilter.value === FilterEnum.all) {
      return tasks.value
    }
    if (currentFilter.value === FilterEnum.pending) {
      return tasks.value.filter(t => t.status === TaskStatusEnum.todo || t.status === TaskStatusEnum.doing)
    }
    if (currentFilter.value === FilterEnum.done) {
      return tasks.value.filter(t => t.status === TaskStatusEnum.done)
    }
    return tasks.value
  })

  const createTask = (taskData) => store.dispatch('createTask', taskData)
  const removeTask = (taskId) => store.dispatch('removeTask', taskId)
  const updateTaskText = (taskId, newText) => store.dispatch('updateTaskText', { taskId, newText })
  const updateTaskDate = (taskId, date) => store.dispatch('updateTaskDate', { taskId, date })

  const cycleStatus = (task) => {
    const nextStatus = StatusConfig[task.status]?.next || TaskStatusEnum.todo
    store.dispatch('updateTaskStatus', { taskId: task.id, newStatus: nextStatus })
  }

  const duplicateTask = (task) => {
    const taskCopy = {
      text: `${task.text} (Copy)`,
      status: task.status,
      dueDate: task.dueDate
    }
    createTask(taskCopy)
  }

  return {
    tasks,
    filteredTasks,
    createTask,
    removeTask,
    updateTaskText,
    updateTaskDate,
    cycleStatus,
    duplicateTask
  }
}
