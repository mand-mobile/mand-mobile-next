<script lang="ts">
export default {
  name: 'DetailItemDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdDetailItem from 'mand-mobile-next/detail-item'
import MdField from 'mand-mobile-next/field'
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-detail-item
      md-example-child-detail-item-0
    "
  >
    <md-field>
      <md-detail-item
        title="承保公司"
        content="众安"
        bold
      />
      <md-detail-item title="投保人" content="张三" />
      <md-detail-item title="被保人" content="李四" />
      <md-detail-item title="保险费用" content="0.1元/日" />
      <md-detail-item
        title="保障日期"
        content="2018/08/08 ~ 2019/08/08"
      />
      <md-detail-item title="保单号" content="123456789" />
      <md-detail-item title="保单协议">
        <a href="#" class="md-example-link"> 查看 </a>
      </md-detail-item>
    </md-field>
  </div>
</template>

<style lang="stylus">
.md-example-link
  color #5878b4
  text-decoration none
</style>
