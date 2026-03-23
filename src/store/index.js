import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { TaskStatusEnum } from '@/constants/tasks'

const localStoragePlugin = (store) => {
  store.subscribe(() => {
    localStorage.setItem('tasks', JSON.stringify(store.state.tasks))
  })
}

const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [
  {
    id: uuidv4(),
    text: 'Go to the Gym',
    status: TaskStatusEnum.todo,
    dueDate: null
  },
  {
    id: uuidv4(),
    text: 'Make the laundry',
    status: TaskStatusEnum.doing,
    dueDate: null
  }
]

export default createStore({
  state: {
    tasks: initialTasks
  },
  plugins: [localStoragePlugin],
  mutations: {
    addTask: (state, task) => {
      state.tasks.push({
        ...task,
        id: uuidv4(),
        status: task.status || TaskStatusEnum.todo,
        dueDate: task.dueDate || null
      })
    },
    deleteTask: (state, taskId) => {
      const index = state.tasks.findIndex((item) => item.id === taskId)
      if (index !== -1) {
        state.tasks.splice(index, 1)
      }
    },
    updateTaskText: (state, { taskId, newText }) => {
      const task = state.tasks.find((item) => item.id === taskId)
      if (task) {
        task.text = newText
      }
    },
    updateTaskStatus: (state, { taskId, newStatus }) => {
      const task = state.tasks.find((item) => item.id === taskId)
      if (task) {
        task.status = newStatus
      }
    },
    updateTaskDate: (state, { taskId, date }) => {
      const task = state.tasks.find((item) => item.id === taskId)
      if (task) {
        task.dueDate = date
      }
    }
  },
  actions: {
    createTask: ({ commit }, task) => {
      commit('addTask', task)
    },
    removeTask: ({ commit }, taskId) => {
      commit('deleteTask', taskId)
    },
    updateTaskText: ({ commit }, { taskId, newText }) => {
      commit('updateTaskText', { taskId, newText })
    },
    updateTaskStatus: ({ commit }, { taskId, newStatus }) => {
      commit('updateTaskStatus', { taskId, newStatus })
    },
    updateTaskDate: ({ commit }, { taskId, date }) => {
      commit('updateTaskDate', { taskId, date })
    }
  }
})
