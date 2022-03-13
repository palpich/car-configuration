<script setup lang="ts">
defineProps<{
  modelValue: string;
  options: { label: string; value: string }[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function handleInputSelect(e: Event) {
  emit("update:modelValue", (e.target as HTMLSelectElement).value);
}
</script>

<template>
  <label class="select-field">
    <div>
      <slot></slot>
    </div>
    <select class="select" :value="modelValue" @input="handleInputSelect">
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.select-field {
  display: block;
  cursor: pointer;
}

.select {
  width: 100%;
  padding: var(--padding);
  border-radius: var(--border-radius);
  border: 2px solid var(--border-color);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 16px 12px;
  appearance: none;
}
</style>
