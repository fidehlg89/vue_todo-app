<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="card-title h4 mb-0 fw-bold text-dark">Todo List</h2>

        <!-- Filter Controls -->
        <div class="btn-group shadow-sm" role="group">
          <template v-for="(label, key) in filters" :key="key">
            <input
              type="radio"
              class="btn-check"
              name="filterRadio"
              :id="`filter-${key}`"
              autocomplete="off"
              :checked="currentFilter === key"
              @change="$emit('update-filter', key)"
            />
            <label class="btn btn-outline-primary btn-sm px-3" :for="`filter-${key}`">
              {{ label }}
            </label>
          </template>
        </div>
      </div>

      <!-- Task List -->
      <ul v-if="tasks.length > 0" class="list-group list-group-flush">
        <TodoItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
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
import { computed, toRefs } from 'vue'
import { useTasks } from '@/composables/useTasks'
import { FilterEnum } from '@/constants/tasks'
import TodoItem from './TodoItem.vue'

const props = defineProps({
  currentFilter: {
    type: String,
    default: FilterEnum.all
  }
})

const { currentFilter } = toRefs(props)
const { tasks, filteredTasks } = useTasks(currentFilter)

defineEmits(['update-filter', 'delete'])

const filters = {
  [FilterEnum.all]: 'All',
  [FilterEnum.pending]: 'Pending',
  [FilterEnum.done]: 'Done'
}
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
