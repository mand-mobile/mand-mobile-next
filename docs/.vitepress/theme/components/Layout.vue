<script setup lang="ts">
import Layout from 'fisand-doc/dist/client/theme-default/Layout.vue'
import { Teleport } from 'vue'
import ThemeSwitch from './ThemeSwitch.vue'
import QrCode from './QrCode.vue'
</script>
<template>
  <Layout />
  <Teleport to=".nav-icons">
    <QrCode />
  </Teleport>
  <Teleport to=".nav-icons">
    <ThemeSwitch />
  </Teleport>
</template>
