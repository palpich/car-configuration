<script setup lang="ts">
import { ConfigurationEntry } from "../../interfaces";
import { reactive, ref } from "vue";
import Button from "../atoms/Button.vue";
import TextField from "../atoms/TextField.vue";
import CheckboxField from "../atoms/CheckboxField.vue";
import SelectField from "../atoms/SelectField.vue";
import { cloneDeep } from "../../utils";

const showConstructorField = ref(false);

const emit = defineEmits<{
  (e: "save", payload: ConfigurationEntry): void;
}>();

const initialState = {
  label: "",
  type: "text",
  stringValue: "",
  booleanValue: false,
  options: [
    {
      value: "",
      label: "",
    },
  ],
};

const state = reactive(cloneDeep(initialState));

function addOptionInstateOptions() {
  state.options.push({
    value: "",
    label: "",
  });
}

function removeOptionFromStateOptions(index: number) {
  if (state.options.length === 1) {
    return;
  }

  state.options.splice(index, 1);
}

function saveEditableOption() {
  let payload: Record<string, any> = {
    type: state.type,
    label: state.label,
  };

  if (state.type === "text") {
    payload.value = state.stringValue;
  }

  if (state.type === "select") {
    payload.value = state.options[0].value;
    payload.options = cloneDeep(state.options);
  }

  if (state.type === "checkbox") {
    payload.value = state.booleanValue;
  }

  emit("save", payload as ConfigurationEntry);

  showConstructorField.value = false;

  resetState();
}

function cancelEditableOption() {
  showConstructorField.value = false;

  resetState();
}

function resetState() {
  Object.assign(state, cloneDeep(initialState));
}

const selectOptions = [
  { label: "text", value: "text" },
  { label: "select", value: "select" },
  { label: "checkbox", value: "checkbox" },
];
</script>

<template>
  <Button v-if="!showConstructorField" @click="showConstructorField = true">
    Добавить новую опцию
  </Button>

  <div v-if="showConstructorField">
    <hr />

    <h2>Настройка нового параметра</h2>

    <TextField class="field" v-model="state.label">Имя параметра</TextField>

    <SelectField class="field" v-model="state.type" :options="selectOptions">
      Тип поля
    </SelectField>

    <TextField
      class="field"
      v-if="state.type === 'text'"
      v-model="state.stringValue"
    >
      Значение по умолчанию
    </TextField>

    <CheckboxField
      class="field"
      v-if="state.type === 'checkbox'"
      v-model="state.booleanValue"
    >
      Значение по умолчанию
    </CheckboxField>

    <fieldset class="field" v-if="state.type === 'select'">
      <legend>Список опций</legend>
      Первый элемент списка, будет значением по умолчанию.
      <div class="entry" v-for="(option, index) in state.options">
        <TextField class="entry--field" v-model="option.label">label</TextField>
        <TextField class="entry--field" v-model="option.value">value</TextField>

        <Button class="entry--field" @click="addOptionInstateOptions">
          +
        </Button>
        <Button
          class="entry--field"
          @click="removeOptionFromStateOptions(index)"
        >
          -
        </Button>
      </div>
    </fieldset>

    <Button @click="saveEditableOption">сохранить</Button>
    <Button @click="cancelEditableOption">отмена</Button>
  </div>
</template>

<style scoped>
.entry {
  display: flex;
  align-items: flex-end;
}

.entry--field + .entry--field {
  margin-left: var(--space);
}

.field {
  margin-bottom: var(--space);
}
</style>
