<template>
  <li
    class="list-group-item d-flex align-items-center justify-content-between p-3 border-start-4 shadow-sm mb-2 rounded"
    :class="overdueClass"
  >
    <div class="d-flex align-items-center flex-grow-1">
      <!-- Task Text / Edit Input -->
      <div v-if="!isEditing" class="me-3 fs-5">
        {{ task.text }}
      </div>
      <div v-else class="input-group me-3">
        <input
          v-model="editedText"
          @keyup.enter="saveEdit"
          @keyup.esc="cancelEdit"
          type="text"
          class="form-control form-control-sm"
          ref="editInput"
        />
        <button @click="saveEdit" class="btn btn-outline-success btn-sm" type="button">
          <i class="bi bi-check-lg"></i>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.42-6.446a.05.05 0 0 1 .01-.039z"/>
          </svg>
        </button>
        <button @click="cancelEdit" class="btn btn-outline-secondary btn-sm" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Status Badge -->
    <div class="me-3">
      <span
        @click="$emit('change-status', task)"
        class="badge rounded-pill cursor-pointer p-2 px-3 text-uppercase"
        :class="statusBadgeClass"
        title="Click to change status"
        style="cursor: pointer;"
      >
        {{ task.status }}
      </span>
    </div>

    <!-- Due Date -->
    <div class="me-3 d-none d-md-block">
      <input
        type="date"
        class="form-control form-control-sm"
        :value="task.dueDate"
        @input="$emit('update-date', { taskId: task.id, date: $event.target.value })"
      />
    </div>

    <!-- Actions -->
    <div class="btn-group shadow-sm">
      <button
        @click="$emit('duplicate', task)"
        class="btn btn-light btn-sm text-primary border"
        title="Duplicate"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
        </svg>
      </button>
      <button
        @click="startEdit"
        v-if="!isEditing"
        class="btn btn-light btn-sm text-warning border"
        title="Edit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </button>
      <button
        @click="$emit('delete', task.id)"
        class="btn btn-light btn-sm text-danger border"
        title="Delete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </button>
    </div>
  </li>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-text', 'change-status', 'update-date', 'duplicate', 'delete'])

const isEditing = ref(false)
const editedText = ref('')
const editInput = ref(null)

const statusBadgeClass = computed(() => {
  switch (props.task.status) {
    case 'todo': return 'bg-warning text-dark'
    case 'doing': return 'bg-info text-dark'
    case 'done': return 'bg-success text-white'
    default: return 'bg-secondary'
  }
})

const overdueClass = computed(() => {
  if (!props.task.dueDate || props.task.status === 'done') return ''
  const dueDate = new Date(props.task.dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dueDate < today ? 'border-start border-danger border-5 bg-danger-subtle' : 'border-start border-primary border-5'
})

const startEdit = async () => {
  editedText.value = props.task.text
  isEditing.value = true
  await nextTick()
  if (editInput.value) editInput.value.focus()
}

const saveEdit = () => {
  if (editedText.value.trim() && editedText.value !== props.task.text) {
    emit('update-text', { taskId: props.task.id, newText: editedText.value })
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.list-group-item {
  transition: all 0.2s ease-in-out;
}
.list-group-item:hover {
  transform: translateX(5px);
}
</style>
