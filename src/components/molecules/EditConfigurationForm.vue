<script setup lang="ts">
import { CarConfiguration, ConfigurationEntry } from "../../interfaces";
import ConstructorField from "./ConstructorField.vue";
import TextField from "../atoms/TextField.vue";
import CheckboxField from "../atoms/CheckboxField.vue";
import SelectField from "../atoms/SelectField.vue";

interface Props {
  data: CarConfiguration;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "add", payload: ConfigurationEntry): void;
}>();

function handleSaveConstructorField(e: ConfigurationEntry) {
  emit("add", e);
}
</script>

<template>
  <div class="container">
    <TextField class="field" v-model="props.data.name">
      Имя конфигурации
    </TextField>

    <template v-for="entry in props.data.options">
      <TextField
        class="field"
        v-if="entry.type === 'text'"
        v-model="entry.value"
      >
        {{ entry.label }}
      </TextField>

      <CheckboxField
        class="field"
        v-if="entry.type === 'checkbox'"
        v-model="entry.value"
      >
        {{ entry.label }}
      </CheckboxField>

      <SelectField
        class="field"
        v-if="entry.type === 'select'"
        :options="entry.options"
        v-model="entry.value"
      >
        {{ entry.label }}
      </SelectField>
    </template>

    <ConstructorField @save="handleSaveConstructorField" />
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  margin: 0 auto 0 50px;
}

.field {
  margin-bottom: var(--space);
}
</style>
