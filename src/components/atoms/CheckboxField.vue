<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function handleInputCheckbox(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).checked);
}
</script>

<template>
  <label class="checkbox-field">
    <slot></slot>
    <input
      class="checkbox"
      type="checkbox"
      :checked="modelValue"
      @input="handleInputCheckbox"
    />
  </label>
</template>

<style scoped>
.checkbox-field {
  display: block;
  cursor: pointer;
}
</style>
