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
        <div class="flex flex-row gap-4">
          <button
            type="button"
            @click="toggleShowPending"
            class="inline-block whitespace-nowrap cursor-pointer rounded px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline font-medium text-xs uppercase bg-indigo-600 text-white"
          >
            {{ showPendingTasks ? 'Show All' : 'Show Pendings' }}
          </button>
          <button
            type="button"
            @click="toggleShowDone"
            class="inline-block whitespace-nowrap cursor-pointer rounded px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline font-medium text-xs uppercase bg-indigo-600 text-white"
          >
            {{ showDoneTasks ? 'Show All' : 'Show Done' }}
          </button>
        </div>
        <div v-if="tasks.length > 0" class="w-full mt-4">
          <ul>
            <li
              class="container grid grid-cols-4 gap-4 px-3 py-2 m-auto border-y-2 bg-slate-200"
            >
              <div class="px-4 text-gray-600">Task</div>
              <div class="px-4 text-gray-600">Status</div>
              <div class="px-4 text-gray-600">Due Date</div>
              <div class="flex justify-center text-gray-600">Action</div>
            </li>
            <li
              class="container grid grid-cols-4 gap-4 px-3 py-3 m-auto border-y-2"
              v-for="(taskItem) in tasks"
              :key="taskItem.id"
              :class="{ 'bg-red-300': isPastDue(taskItem) && !isTaskCompleted(taskItem) }"
            >
              <div class="flex items-center px-4">
                <span v-if="!isTaskEditing(taskItem)">{{ taskItem.text }}</span>
                <input
                  v-else
                  v-model="editedText"
                  @keyup.enter="saveEditedTask(taskItem)"
                  @keyup.esc="stopEditingTask()"
                  type="text"
                  class="w-40 px-1 my-1 text-lg font-medium text-gray-600 border-b-4 border-gray-800 border-solid bg-slate-200 focus:outline-none"
                  placeholder="Edit task"
                />
                <div class="flex">
                  <button
                    @click="saveEditedTask(taskItem)"
                    v-if="editingTaskId === taskItem.id"
                    class="w-6 h-6 text-green-700"
                    title="Save"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    @click="stopEditingTask()"
                    v-if="editingTaskId === taskItem.id"
                    class="w-6 h-6 text-gray-600"
                    title="Cancel"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex items-center px-4">
                <span
                  @click="changeTaskStatus(taskItem)"
                  :class="buttonClass(taskItem)"
                  class="inline-block whitespace-nowrap cursor-pointer rounded px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline font-medium text-xs uppercase"
                  title="Click to change status"
                >
                  {{ taskItem.status }}
                </span>
              </div>
              <div class="flex items-center px-4">
                <input
                  :value="taskItem.dueDate"
                  @input="(e)=>setTaskDueDate(e, taskItem.id)"
                  type="date"
                  class="w-32 px-2 py-1 text-sm text-gray-600 border rounded-md focus:outline-none"
                />
              </div>
              <div class="flex items-center justify-center">
                <button
                  @click="duplicateTask(taskItem)"
                  class="w-6 h-6 text-blue-600"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                </svg>

                </button>
                <button
                  @click="startEditingTask(taskItem)"
                  v-if="!isTaskEditing(taskItem)"
                  class="w-6 h-6 text-yellow-500"
                  title="Edit task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                    />
                    <path
                      d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteTaskWithConfirmation(taskItem.id)"
                  class="w-6 h-6 text-red-600"
                  title="Delete task"
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
import { TaskStatusEnum } from './store'

export default {
  components: { ConfirmationDialog },
  data () {
    return {
      task: '',
      showDeleteModal: false,
      taskToDelete: null,
      editingTaskId: null, // Almacenará el ID del task en edición
      editedText: '',
      originalText: '',
      showPendingTasks: false,
      showDoneTasks: false
    }
  },
  computed: {
    tasks () {
      if (this.showPendingTasks) {
        // Show only pending tasks - todo and doing
        return this.$store.state.tasks.filter(
          (task) =>
            task.status === TaskStatusEnum.todo || task.status === TaskStatusEnum.doing
        )
      } else if (this.showDoneTasks) {
        // Show only done tasks
        return this.$store.state.tasks.filter((task) => task.status === TaskStatusEnum.done)
      } else {
        // Show all tasks
        return this.$store.state.tasks
      }
    },
    buttonClass () {
      return (task) => {
        if (task.status === TaskStatusEnum.todo) {
          return 'bg-yellow-300'
        } else if (task.status === TaskStatusEnum.doing) {
          return 'bg-orange-300'
        } else if (task.status === TaskStatusEnum.done) {
          return 'bg-green-300'
        }
      }
    },
    overdueTasks () {
      return this.$store.state.tasks.filter(
        (task) => this.isPastDue(task) && !this.isTaskCompleted(task)
      )
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
    duplicateTask (task) {
      const duplicatedTask = { ...task }

      // Add the duplicated task to the list of tasks in the store
      this.$store.dispatch('createTask', duplicatedTask)
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
      this.originalText = task.text
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
        this.$store.dispatch('updateTaskText', {
          taskId: task.id,
          newText: this.editedText
        })
        this.stopEditingTask()
      }
    },
    changeTaskStatus (task) {
      if (task.status === TaskStatusEnum.todo) {
        task.status = TaskStatusEnum.doing
      } else if (task.status === TaskStatusEnum.doing) {
        task.status = TaskStatusEnum.done
      } else if (task.status === TaskStatusEnum.done) {
        task.status = TaskStatusEnum.todo
      }

      this.$store.dispatch('updateTaskStatus', {
        taskId: task.id,
        newStatus: task.status
      })
    },
    setTaskDueDate (e, taskId) {
      console.log(e.target.value)
      this.$store.dispatch('updateTaskDate', {
        taskId: taskId,
        date: e.target.value
      })
    },
    toggleShowPending () {
      this.showDoneTasks = false
      this.showPendingTasks = !this.showPendingTasks
    },
    toggleShowDone () {
      this.showPendingTasks = false
      this.showDoneTasks = !this.showDoneTasks
    },
    isPastDue (task) {
      if (!task.dueDate) {
        return false
      }
      const dueDate = new Date(task.dueDate)
      const today = new Date()
      return dueDate < today
    },

    isTaskCompleted (task) {
      return task.status === TaskStatusEnum.done
    }
  }
}
</script>
