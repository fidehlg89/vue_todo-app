<template>
  <div class="min-vh-100 bg-light pb-5">
    <TodoForm />

    <main class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <TodoList
            :currentFilter="currentFilter"
            @update-filter="setFilter"
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
import { ref } from 'vue'
import { useTasks } from '@/composables/useTasks'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import ConfirmationDialog from './components/ConfirmationDialog.vue'
import { FilterEnum } from './constants/tasks'

const currentFilter = ref(FilterEnum.all)
const showDeleteModal = ref(false)
const taskToDeleteId = ref(null)

const { removeTask } = useTasks()

const setFilter = (filter) => {
  currentFilter.value = filter
}

const handleDeleteClick = (taskId) => {
  taskToDeleteId.value = taskId
  showDeleteModal.value = true
}

const handleConfirmDelete = () => {
  if (taskToDeleteId.value) {
    removeTask(taskToDeleteId.value)
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

.bg-light {
  background-color: #f8fafc !important;
}
</style>
