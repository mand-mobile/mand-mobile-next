---
navbar: false
sidebar: false
editLink: false
replace: true
---
<script setup>
import { inBrowser, useRouter } from 'vitepress'
import { onMounted } from 'vue'

onMounted(() => {
  useRouter().go('/mand-mobile-next/zh-CN/')
})
</script>
