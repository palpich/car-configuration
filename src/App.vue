<template>
  <Dashboard />
</template>

<script setup lang="ts">
import Dashboard from "./components/pages/Dashboard.vue";
</script>

<style>
:root {
  /* Colors */
  --primary: #0f72ff;
  --on-primary: #ffffff;

  /* Shape */
  --border-radius: 5px;
  --padding: 0.375rem 0.75rem;
  --border-color: #ced4da;

  /* Space */
  --space: 0.75em;
}

body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

* {
  box-sizing: border-box;
}
</style>
