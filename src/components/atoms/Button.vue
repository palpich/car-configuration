<template>
  <button class="button" v-bind="$attrs" type="button"><slot /></button>
</template>

<style scoped>
.button {
  padding: var(--padding);
  background-color: var(--on-primary);
  color: var(--primary);
  border-radius: var(--border-radius);
  text-transform: uppercase;
  border: 2px solid var(--primary);
  cursor: pointer;
}

.button + .button {
  margin-left: var(--space);
}
</style>
