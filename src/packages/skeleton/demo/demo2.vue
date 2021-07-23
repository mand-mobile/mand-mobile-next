<script lang="ts">
export default {
  name: 'SkeletonDemo',
  title: '3s后加载完成',
}
</script>
<script setup lang="ts">
import MdSkeleton from 'mand-mobile-next/skeleton'
import MdField from 'mand-mobile-next/field'
import MdCellItem from 'mand-mobile-next/cell-item'
import { ref, onMounted } from 'vue'

const loading = ref(true)

const startLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}

onMounted(() => {
  startLoading()
})
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-skeleton
      md-example-child-skeleton-0
    "
  >
    <md-field>
      <md-skeleton
        avatar
        title
        :loading="loading"
        :row="2"
        class="skeleton-item"
      >
        <md-cell-item
          title="交通银行"
          brief="展示摘要描述"
          addon="附加文案"
          arrow
        >
          <template #left>
            <span class="holder"></span>
          </template>
        </md-cell-item>
      </md-skeleton>
      <md-skeleton
        avatar
        title
        :loading="loading"
        :row="2"
        class="skeleton-item"
      >
        <md-cell-item
          title="招商银行"
          brief="展示摘要描述"
          addon="附加文案"
          arrow
        >
          <template #left>
            <span class="holder"></span>
          </template>
        </md-cell-item>
      </md-skeleton>
    </md-field>
  </div>
</template>

<style lang="stylus">
.md-example-child-skeleton-0
  margin 30px 0
</style>
