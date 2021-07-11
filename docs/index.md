---
navbar: false
sidebar: false
editLink: false
replace: true
---
<script setup>
import { inBrowser, useRouter, withBase } from 'vitepress'
import { onMounted } from 'vue'

onMounted(() => {
  useRouter().go(withBase('/zh-CN/'))
})
</script>
