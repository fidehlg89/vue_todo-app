<template>
  <div>
    <input
      v-model="todo"
      class="w-64 p-2 border rounded"
      @keyup.enter="addTodo"
      placeholder="Enter a new task..."
    />
    <button @click="addTodo" class="px-4 py-2 ml-2 text-white bg-blue-500 rounded">
      Add Task
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todo: ''
    }
  },
  methods: {
    addTodo () {
      if (this.todo.trim()) {
        this.$store.dispatch('createTodo', { text: this.todo, completed: false })
        this.todo = ''
      }
    }
  }
}
</script>
