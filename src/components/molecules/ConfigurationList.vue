<script setup lang="ts">
import { CarConfiguration } from "../../interfaces";
import Button from "../atoms/Button.vue";

interface Props {
  data: CarConfiguration[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "select", value: string): void;
  (e: "add"): void;
}>();

function selectConfig(value: string, e: Event) {
  e.preventDefault();

  emit("select", value);
}

function addConfig() {
  emit("add");
}
</script>

<template>
  <div class="container">
    <template v-for="item in props.data" :key="item.name">
      <details :open="item.selected">
        <summary class="summary" @click="selectConfig(item.name, $event)">
          {{ item.name }}
        </summary>

        <ul>
          <li v-for="entry in item.options" :key="entry.label">
            {{ entry.label }} — {{ entry.value }}
          </li>
        </ul>
      </details>
    </template>

    <Button @click="addConfig">создать комплектацию</Button>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  margin: 0 50px 0 auto;
}

.summary {
  padding: var(--padding);
  background-color: var(--primary);
  color: var(--on-primary);
  margin-bottom: var(--space);
  border-radius: var(--border-radius);
  cursor: pointer;
}
</style>
