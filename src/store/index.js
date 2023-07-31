import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex)

export const TaskStatusEnum = {
  todo: 'todo',
  doing: 'doing',
  done: 'done'
}

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: uuidv4(),
        text: 'Go to the Gym',
        status: TaskStatusEnum.todo,
        dueDate: null
      },
      {
        id: uuidv4(),
        text: 'Make the Homework',
        status: TaskStatusEnum.doing,
        dueDate: null
      }
    ]
  },
  mutations: {
    addTask: (state, task) => {
      state.tasks.push({ ...task, id: uuidv4(), status: task.status ? task.status : TaskStatusEnum.todo, completed: false })
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
    updateStatus: (state, { taskId, newStatus }) => {
      const task = state.tasks.find((item) => item.id === taskId)
      if (task) {
        task.status = newStatus
      }
    },
    updateDate: (state, { taskId, date }) => {
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
      commit('updateStatus', { taskId, newStatus })
    },
    updateTaskDate: ({ commit }, { taskId, date }) => {
      commit('updateDate', { taskId, date })
    }
  }
})
