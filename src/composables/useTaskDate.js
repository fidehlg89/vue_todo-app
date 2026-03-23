import { computed } from 'vue'
import { TaskStatusEnum } from '@/constants/tasks'

export function useTaskDate(task) {
  const isOverdue = computed(() => {
    if (!task.dueDate || task.status === TaskStatusEnum.done) return false
    
    const dueDate = new Date(task.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return dueDate < today
  })

  const overdueClass = computed(() => {
    if (!task.dueDate || task.status === TaskStatusEnum.done) return ''
    return isOverdue.value 
      ? 'border-start border-danger border-5 bg-danger-subtle' 
      : 'border-start border-primary border-5'
  })

  return {
    isOverdue,
    overdueClass
  }
}
