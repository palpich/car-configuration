<script setup lang="ts">
import ConfigurationList from "../molecules/ConfigurationList.vue";
import EditConfigurationForm from "../molecules/EditConfigurationForm.vue";
import { computed, reactive, ref, unref, watch } from "vue";
import { CarConfiguration, ConfigurationEntry } from "../../interfaces";
import { cloneDeep } from "../../utils";

const entriesOfCarConfigurations = reactive<ConfigurationEntry[]>([
  {
    type: "select",
    label: "Мотор",
    value: "V6 3.5L",
    options: [
      { label: "V6 3.5L", value: "V6 3.5L" },
      { label: "V4 2L", value: "V4 2L" },
    ],
  },
  { type: "checkbox", label: "Пневмоподвеска", value: false },
  { type: "text", label: "Надпись на капоте", value: "" },
]);

const carConfigurations = reactive<CarConfiguration[]>([
  {
    name: "Sport",
    selected: true,
    options: [
      Object.assign(cloneDeep(entriesOfCarConfigurations[0]), {
        value: "V6 3.5L",
      }),
      Object.assign(cloneDeep(entriesOfCarConfigurations[1]), { value: true }),
      Object.assign(cloneDeep(entriesOfCarConfigurations[2]), { value: "" }),
    ],
  },
  {
    name: "Standard",
    selected: false,
    options: [
      Object.assign(cloneDeep(entriesOfCarConfigurations[0]), {
        value: "V4 2L",
      }),
      Object.assign(cloneDeep(entriesOfCarConfigurations[1]), { value: false }),
      Object.assign(cloneDeep(entriesOfCarConfigurations[2]), { value: "" }),
    ],
  },
]);

watch(entriesOfCarConfigurations, (newValue) => {
  carConfigurations.forEach((item) => {
    item.options = cloneDeep(newValue);
  });
});

function handleSelectedConfig(value: CarConfiguration["name"]) {
  carConfigurations.forEach((item) => {
    item.selected = item.name === value;
  });
}

const selectedConfiguration = computed<CarConfiguration>({
  get() {
    return carConfigurations.find((item) => item.selected)!;
  },
  set(newVal) {
    Object.assign(
      carConfigurations.find((item) => item.selected),
      newVal
    );
  },
});

// Счетчик, который увеличивается каждый раз, когда создается новая запись.
const counter = ref(1);

function addConfig() {
  const name = `Новая конфигурация ${unref(counter)}`;

  carConfigurations.push({
    name,
    selected: true,
    options: entriesOfCarConfigurations,
  });

  handleSelectedConfig(name);

  counter.value++;
}

function addNewOption(configEntry: ConfigurationEntry) {
  entriesOfCarConfigurations.push(configEntry);
}
</script>

<template>
  <div class="car-config">
    <ConfigurationList
      :data="carConfigurations"
      @select="handleSelectedConfig"
      @add="addConfig"
    />

    <EditConfigurationForm :data="selectedConfiguration" @add="addNewOption" />
  </div>
</template>

<style scoped>
.car-config {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
