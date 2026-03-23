export const TaskStatusEnum = {
  todo: 'todo',
  doing: 'doing',
  done: 'done'
}

export const StatusConfig = {
  [TaskStatusEnum.todo]: {
    label: 'Todo',
    class: 'bg-warning text-dark',
    next: TaskStatusEnum.doing
  },
  [TaskStatusEnum.doing]: {
    label: 'Doing',
    class: 'bg-info text-dark',
    next: TaskStatusEnum.done
  },
  [TaskStatusEnum.done]: {
    label: 'Done',
    class: 'bg-success text-white',
    next: TaskStatusEnum.todo
  }
}

export const FilterEnum = {
  all: 'all',
  pending: 'pending',
  done: 'done'
}
