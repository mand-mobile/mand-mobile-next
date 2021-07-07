<script setup lang="ts">
import { useRoute } from 'vitepress'
import { isZh, isEn, useCurrentPath } from '../composables/i18n'
const route = useRoute()
</script>

<template>
  <button aria-label="Toggle Theme" class="nav-btn m-0 p-0">
    <a class="block" :href="useCurrentPath(route.path, true)">
      <uil:letter-chinese-a v-show="isEn(route.path)"/>
    </a>
    <a class="block" :href="useCurrentPath(route.path, true)">
      <ri:english-input v-show="isZh(route.path)"/>
    </a>
  </button>
</template>

<style>
.nav-btn a {
  color: var(--c-text);
}
</style>
