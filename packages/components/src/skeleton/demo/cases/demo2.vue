<template>
  <div class="md-example-child md-example-child-skeleton md-example-child-skeleton-2">
    <md-field>
      <md-skeleton avatar title :loading="loading" :row="2" class="skeleton-item">
        <md-cell-item title="交通银行" brief="展示摘要描述" addon="附加文案" arrow>
          <span class="holder" slot="left"></span>
        </md-cell-item>
      </md-skeleton>
      <md-skeleton avatar title :loading="loading" :row="2" class="skeleton-item">
        <md-cell-item title="招商银行" brief="展示摘要描述" addon="附加文案" arrow>
          <span class="holder" slot="left"></span>
        </md-cell-item>
      </md-skeleton>
    </md-field>
    <md-button type="primary" size="small" inline @click="startLoading">开始加载</md-button>
  </div>
</template>

<script>
import Skeleton from 'mand-mobile/lib/skeleton'
import Field from 'mand-mobile/lib/field'
import CellItem from 'mand-mobile/lib/cell-item'
import Button from 'mand-mobile/lib/button'

export default {
  data() {
    return {
      loading: true,
    }
  },
  components: {
    'md-skeleton': Skeleton,
    'md-field': Field,
    'md-cell-item': CellItem,
    'md-button': Button,
  },
  mounted() {
    this.startLoading()
  },
  methods: {
    startLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '加载正文',
    describe: '3s后加载完成',
  },
  'en-US': {
    title: 'Loading body',
    describe: 'Load completed after 3s',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-skeleton-2 {
  margin: 30px 0;
}
.skeleton-switch {
  margin-bottom: 32px;
}
.md-example-child-skeleton-2 .skeleton-item:last-child {
  margin-bottom: 0;
  margin-bottom: 24px;
}
.md-example-child-skeleton-2 .md-cell-item.skeleton-item {
  margin-bottom: 0;
}
.md-example-child-skeleton-2 .holder {
  display: block;
  width: 80px;
  height: 80px;
  background-color: #e6e6e6;
  border-radius: 50%;
}
</style>
