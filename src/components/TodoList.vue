<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="card-title h4 mb-0 fw-bold text-dark">Todo List</h2>
        
        <!-- Filter Controls -->
        <div class="btn-group shadow-sm" role="group">
          <input
            type="radio"
            class="btn-check"
            name="filterRadio"
            id="filterAll"
            autocomplete="off"
            :checked="currentFilter === 'all'"
            @change="$emit('update-filter', 'all')"
          />
          <label class="btn btn-outline-primary btn-sm px-3" for="filterAll">All</label>

          <input
            type="radio"
            class="btn-check"
            name="filterRadio"
            id="filterPending"
            autocomplete="off"
            :checked="currentFilter === 'pending'"
            @change="$emit('update-filter', 'pending')"
          />
          <label class="btn btn-outline-primary btn-sm px-3" for="filterPending">Pending</label>

          <input
            type="radio"
            class="btn-check"
            name="filterRadio"
            id="filterDone"
            autocomplete="off"
            :checked="currentFilter === 'done'"
            @change="$emit('update-filter', 'done')"
          />
          <label class="btn btn-outline-primary btn-sm px-3" for="filterDone">Done</label>
        </div>
      </div>

      <!-- Task List -->
      <ul v-if="tasks.length > 0" class="list-group list-group-flush">
        <TodoItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @update-text="$emit('update-text', $event)"
          @change-status="$emit('change-status', $event)"
          @update-date="$emit('update-date', $event)"
          @duplicate="$emit('duplicate', $event)"
          @delete="$emit('delete', $event)"
        />
      </ul>
      
      <!-- Empty State -->
      <div v-else class="text-center py-5">
        <img src="https://img.icons8.com/clouds/100/000000/todo-list.png" alt="Empty list" class="mb-3 opacity-50" />
        <p class="text-muted fs-5">No tasks yet. Add a task using the form above.</p>
      </div>

      <!-- No Filtered Tasks State -->
      <div v-if="tasks.length > 0 && filteredTasks.length === 0" class="text-center py-4">
        <p class="text-muted italic">No tasks match the current filter.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TodoItem from './TodoItem.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  currentFilter: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits([
  'update-filter', 
  'update-text', 
  'change-status', 
  'update-date', 
  'duplicate', 
  'delete'
])

const filteredTasks = computed(() => {
  if (props.currentFilter === 'pending') {
    return props.tasks.filter(t => t.status === 'todo' || t.status === 'doing')
  } else if (props.currentFilter === 'done') {
    return props.tasks.filter(t => t.status === 'done')
  }
  return props.tasks
})
</script>

<style scoped>
.btn-check:checked + .btn-outline-primary {
  background-color: #667eea;
  border-color: #667eea;
}
.btn-outline-primary {
  color: #667eea;
  border-color: #667eea;
}
.btn-outline-primary:hover {
  background-color: #667eea;
  border-color: #667eea;
  color: white;
}
</style>
