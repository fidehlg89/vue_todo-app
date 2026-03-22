<template>
  <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header bg-danger text-white border-0">
          <h5 class="modal-title h5 mb-0">Confirm Deletion</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('cancel')"></button>
        </div>
        <div class="modal-body p-4">
          <p class="fs-5 mb-0">Are you sure you want to delete this task? This action cannot be undone.</p>
        </div>
        <div class="modal-footer border-0 p-3">
          <button type="button" class="btn btn-light px-4" @click="$emit('cancel')">No, Cancel</button>
          <button type="button" class="btn btn-danger px-4" @click="$emit('confirm')">Yes, Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.modal {
  z-index: 1050;
}
</style>
