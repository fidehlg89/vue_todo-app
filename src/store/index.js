import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: uuidv4(),
        text: 'Go to the Gym',
        completed: false
      },
      {
        id: uuidv4(),
        text: 'Make the Homework',
        completed: true
      }
    ]
  },
  mutations: {
    addTask: (state, task) => {
      state.tasks.push({ ...task, id: uuidv4(), completed: false })
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
    }
  }
})
