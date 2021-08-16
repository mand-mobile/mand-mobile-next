<script setup lang="ts">
import { Teleport, onMounted, ref } from 'vue'
import Layout from 'fisand-doc/dist/client/theme-default/Layout.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import QrCode from './QrCode.vue'

const showTeleport = ref(false)

onMounted(() => {
  setTimeout(() => {
    showTeleport.value = true
  }, 1000)
})
</script>
<template>
  <Layout />
  <ClientOnly v-if="showTeleport">
    <Teleport to=".nav-icons">
      <QrCode />
    </Teleport>
    <Teleport to=".nav-icons">
      <ThemeSwitch />
    </Teleport>
  </ClientOnly>
</template>
