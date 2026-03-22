<template>
  <div class="min-vh-100 bg-light pb-5">
    <TodoForm />
    
    <main class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <TodoList
            :tasks="tasks"
            :currentFilter="currentFilter"
            @update-filter="setFilter"
            @update-text="handleUpdateText"
            @change-status="handleChangeStatus"
            @update-date="handleUpdateDate"
            @duplicate="handleDuplicate"
            @delete="handleDeleteClick"
          />
        </div>
      </div>
    </main>

    <!-- Modals -->
    <ConfirmationDialog
      v-if="showDeleteModal"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import ConfirmationDialog from './components/ConfirmationDialog.vue'

const store = useStore()
const currentFilter = ref('all')
const showDeleteModal = ref(false)
const taskToDeleteId = ref(null)

const tasks = computed(() => store.state.tasks)

const setFilter = (filter) => {
  currentFilter.value = filter
}

const handleUpdateText = ({ taskId, newText }) => {
  store.dispatch('updateTaskText', { taskId, newText })
}

const handleChangeStatus = (task) => {
  let nextStatus = 'todo'
  if (task.status === 'todo') nextStatus = 'doing'
  else if (task.status === 'doing') nextStatus = 'done'
  else if (task.status === 'done') nextStatus = 'todo'

  store.dispatch('updateTaskStatus', {
    taskId: task.id,
    newStatus: nextStatus
  })
}

const handleUpdateDate = ({ taskId, date }) => {
  store.dispatch('updateTaskDate', { taskId, date })
}

const handleDuplicate = (task) => {
  // Creating a true copy without the same ID (store handles ID gen)
  const taskCopy = { 
    text: `${task.text} (Copy)`,
    status: task.status,
    dueDate: task.dueDate
  }
  store.dispatch('createTask', taskCopy)
}

const handleDeleteClick = (taskId) => {
  taskToDeleteId.value = taskId
  showDeleteModal.value = true
}

const handleConfirmDelete = () => {
  if (taskToDeleteId.value) {
    store.dispatch('removeTask', taskToDeleteId.value)
  }
  showDeleteModal.value = false
  taskToDeleteId.value = null
}

const handleCancelDelete = () => {
  showDeleteModal.value = false
  taskToDeleteId.value = null
}
</script>

<style>
/* Global styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #333;
}

.cursor-pointer {
  cursor: pointer;
}

/* Custom background for the whole app if needed */
.bg-light {
  background-color: #f8fafc !important;
}
</style>
