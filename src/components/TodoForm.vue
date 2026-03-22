<template>
  <header class="py-5 mb-4 rounded-top bg-primary text-white text-center shadow">
    <h1 class="display-5 mb-4">TODO List</h1>
    <div class="container pb-3">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="bg-white p-3 rounded shadow-sm">
            <div class="input-group">
              <input
                v-model="task"
                @keyup.enter="addTask"
                type="text"
                class="form-control form-control-lg border-0 border-bottom border-dark rounded-0 px-1"
                placeholder="What would you like to do?"
              />
              <button
                @click="addTask"
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
import { useStore } from 'vuex'

const store = useStore()
const task = ref('')

const addTask = () => {
  if (task.value.trim()) {
    store.dispatch('createTask', {
      text: task.value,
      status: 'todo'
    })
    task.value = ''
  }
}
</script>

<style scoped>
.header-gradient {
  background: linear-gradient(to right, #a78bfa, #3b82f6);
}
/* Overriding standard primary for better aesthetics as per user requirements */
.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
input:focus {
  box-shadow: none;
  border-bottom-width: 3px !important;
}
</style>
