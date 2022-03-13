<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function handleInputText(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <label class="text-field">
    <div>
      <slot></slot>
    </div>
    <input
      class="input"
      type="text"
      :value="modelValue"
      @input="handleInputText"
    />
  </label>
</template>

<style scoped>
.text-field {
  display: block;
  cursor: pointer;
}

.input {
  width: 100%;
  padding: var(--padding);
  border-radius: var(--border-radius);
  border: 2px solid var(--border-color);
}
</style>
