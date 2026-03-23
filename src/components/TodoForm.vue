<template>
  <header class="py-5 mb-4 rounded-top bg-primary text-white text-center shadow">
    <h1 class="display-5 mb-4">TODO List</h1>
    <div class="container pb-3">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="bg-white p-3 rounded shadow-sm">
            <div class="input-group">
              <input
                v-model="newTaskText"
                @keyup.enter="handleAddTask"
                type="text"
                class="form-control form-control-lg border-0 border-bottom border-dark rounded-0 px-1"
                placeholder="What would you like to do?"
              />
              <button
                @click="handleAddTask"
                class="btn btn-primary px-4"
                type="button"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useTasks } from '@/composables/useTasks'

const { createTask } = useTasks()
const newTaskText = ref('')

const handleAddTask = () => {
  if (newTaskText.value.trim()) {
    createTask({
      text: newTaskText.value
    })
    newTaskText.value = ''
  }
}
</script>

<style scoped>
.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
input:focus {
  box-shadow: none;
  border-bottom-width: 3px !important;
}
</style>
