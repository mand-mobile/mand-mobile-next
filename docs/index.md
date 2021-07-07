---
navbar: false
sidebar: false
editLink: false
replace: true
---
<script setup>
import { inBrowser, useRouter } from 'vitepress'
import { onMounted } from 'vue'

if (inBrowser) {
  window.location.replace(window.location.href + 'zh-CN/')
}
</script>
