<template>
  <span class="badge p-1 text-light-300 rounded-md text-xs"><slot/></span>
</template>

<style>
.badge {
  position: relative;
  top: -2px;
  background-color: var(--md-color-primary);
}
</style>