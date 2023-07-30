<template>
  <div class="container px-4 mx-auto mt-5 lg:w-[800px]">
    <header
      class="h-[120px] px-5 mb-4 rounded-t-md bg-gradient-to-r from-purple-400 to-blue-500"
    >
      <h1 class="my-4 text-2xl text-center text-gray-700">TODO List</h1>
      <div
        class="flex flex-col items-center mx-auto w-full-sm mt-5 overflow-hidden bg-white rounded-md shadow-lg p-[10px]"
      >
        <input
          v-model="task"
          @keyup.enter="addTask"
          type="text"
          class="w-64 px-1 my-5 text-lg font-medium text-gray-600 border-b-4 border-gray-800 border-solid focus:outline-none"
          placeholder="What would you like to do?"
        />
        <button
          @click="addTask"
          class="block w-1/3 px-4 py-2 text-white rounded-md bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Add
        </button>
      </div>
    </header>
    <main class="mt-[100px] px-5">
      <div
        class="flex flex-col items-center px-0 py-4 mx-auto mt-5 overflow-hidden bg-white rounded-md shadow-lg w-full-sm"
      >
        <h2 class="w-full px-4 text-2xl font-bold text-left">Todo List</h2>
        <div v-if="tasks.length > 0" class="w-full mt-4">
          <ul>
            <li
              class="container grid grid-cols-3 gap-4 px-3 py-2 m-auto border-y-2 bg-slate-200"
            >
              <div class="px-4 text-gray-600">Task</div>
              <div class="px-4 text-gray-600">Status</div>
              <div class="flex justify-center text-gray-600">Action</div>
            </li>
            <li
              class="container grid grid-cols-3 gap-4 px-3 py-3 m-auto border-y-2"
              v-for="(taskItem, index) in tasks"
              :key="index"
            >
              <div class="flex items-center px-4">
                <span v-if="!isTaskEditing(taskItem)">{{ taskItem.text }}</span>
                <input
                  v-else
                  v-model="editedText"
                  @keyup.enter="saveEditedTask(taskItem)"
                  @blur="saveEditedTask(taskItem)"
                  type="text"
                  class="w-40 px-1 my-1 text-lg font-medium text-gray-600 border-b-4 border-gray-800 border-solid bg-slate-200 focus:outline-none"
                  placeholder="Edit task"
                />
              </div>
              <div class="flex items-center px-4">
                {{ taskItem.completed ? "Done" : "In Progress" }}
              </div>
              <div class="flex items-center justify-center">
                <button
                  @click="startEditingTask(taskItem)"
                  v-if="!isTaskEditing(taskItem)"
                  class="w-6 h-6 text-blue-600"
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
                </button>
                <button @click="stopEditingTask()" v-if="editingTaskId !== null" class="w-6 h-6 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  @click="deleteTaskWithConfirmation(taskItem.id)"
                  class="w-6 h-6 text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="mt-4">
          No tasks yet. Add a task using the form above.
        </div>
      </div>
    </main>
    <div v-if="showDeleteModal">
      <ConfirmationDialog
        :onConfirm="deleteConfirmed"
        :onCancel="deleteCanceled"
      />
    </div>
  </div>
</template>

<script>
import ConfirmationDialog from './components/ConfirmationDialog.vue'

export default {
  components: { ConfirmationDialog },
  data () {
    return {
      task: '',
      showDeleteModal: false,
      taskToDelete: null,
      editingTaskId: null, // Almacenará el ID del task en edición
      editedText: ''
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },
  methods: {
    addTask () {
      if (this.task.trim()) {
        this.$store.dispatch('createTask', {
          text: this.task,
          completed: false
        })
        this.task = ''
      }
    },
    deleteTaskWithConfirmation (taskId) {
      // Show the delete confirmation modal
      this.taskToDelete = taskId
      this.showDeleteModal = true
    },
    deleteConfirmed () {
      this.$store.dispatch('removeTask', this.taskToDelete)
      this.showDeleteModal = false
    },
    deleteCanceled () {
      this.taskToDelete = null
      this.showDeleteModal = false
    },
    startEditingTask (task) {
      if (this.editingTaskId === null) {
        this.editingTaskId = task.id
        this.editedText = task.text
      }
    },
    stopEditingTask () {
      this.editingTaskId = null
      this.editedText = ''
    },
    isTaskEditing (task) {
      return this.editingTaskId === task.id
    },
    saveEditedTask (task) {
      if (this.editingTaskId !== null && this.editedText.trim() !== '') {
        this.$store.dispatch('updateTaskText', { taskId: task.id, newText: this.editedText })
        this.stopEditingTask()
      }
    }
  }
}
</script>
