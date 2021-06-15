<script lang="ts">
export default {
  name: 'FieldDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'
import MdIcon from 'mand-mobile/icon'

const onClick = () => {
  console.log('zzzz')
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-field
      md-example-child-field-0
    "
  >
    <md-field
      title="区域标题"
      brief="区域描述性文本，可根据具体场景配置"
    >
      <template #action>
        <div class="action-container" @click="onClick">
          操作 <md-icon name="rectangle"></md-icon>
        </div>
      </template>
      <template #footer>
        <p>区域页脚区域内容插槽</p>
      </template>
      <md-field-item
        solid
        title="标题区域"
        placeholder="提示文本"
      />
      <md-field-item
        solid
        title="标题区域"
        content="内容文本"
        addon="次要信息"
      />
      <md-field-item
        solid
        title="附加内容"
        content="正文内容"
      >
        <template #children>
          <p>这是子内容区域</p>
        </template>
      </md-field-item>
      <md-field-item
        solid
        title="动作条目"
        arrow
        @click="onClick"
      />
      <md-field-item
        solid
        title="禁用条目"
        content="内容禁用状态"
        arrow
        disabled
      />
    </md-field>
  </div>
</template>

<style lang="stylus">
.md-example-child-field-0
  .md-field-action
    height 36px
    align-items flex-end
    .action-container
      display flex
      align-items center
      .md-icon
        margin-left 10px
        color #C5CAD5
        font-size 16px
        width auto
        height auto
        line-height normal
</style>
