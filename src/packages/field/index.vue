<template>
  <!-- 考虑换个标签 -->
  <section
    class="md-field"
    :class="[
      {
        'md-field--is-plain': plain,
        'md-field--is-disabled': disabled,
      },
    ]"
  >
    <header
      v-if="
        title || brief || $slots.header || $slots.action
      "
      class="md-field_header"
    >
      <div class="md-field_header_heading">
        <legend
          v-if="title"
          class="md-field_header_title"
          v-text="title"
        ></legend>
        <p
          v-if="brief"
          class="md-field_header_brief"
          v-text="brief"
        ></p>
        <slot name="header"></slot>
      </div>
      <div class="md-field_header_action">
        <slot name="action"></slot>
      </div>
    </header>
    <div class="md-field_content">
      <slot></slot>
    </div>
    <footer v-if="$slots.footer" class="md-field_footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  provide,
} from 'vue'

export default defineComponent({
  name: 'MdField',
  props: {
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    provide('rootField', getCurrentInstance())
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-field
  padding field-padding-v field-padding-h
  border none
  background-color field-bg-color
  &--is-plain
    padding 0
    background-color transparent

.md-field_header
  position relative
  display flex
  align-items center
  justify-content space-between
  margin-bottom field-header-gap

.md-field_header_heading
  flex 1 1 0%

.md-field_header_action
  flex-shrink 0
  display inline-flex
  align-items center
  align-self flex-start
  justify-content flex-end
  margin-left h-gap-sm
  color field-action-color
  font-size field-action-font-size

.md-field_header_title
  color field-title-color
  font-size field-title-font-size
  font-weight field-title-font-weight
  line-height 1

.md-field_header_brief
  margin-top v-gap-xs
  color field-brief-color
  font-size field-brief-font-size
  line-height 1.4

.md-field_footer
  margin-top field-footer-gap

.md-field
  &:disabled,
  &--is-disabled
    .md-field_header_title,
    .md-field_header_brief,
    .md-field_header_action,
    .md-field_content,
    .md-field_footer
      color color-text-disabled
</style>
