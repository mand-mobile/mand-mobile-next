<template>
  <fieldset class="md-field" :class="[{'md-field--is-plain': plain, 'md-field--is-disabled': disabled}]">
    <header class="md-field_header" v-if="title || brief || $slots.header || $slots.action">
      <div class="md-field_header_heading">
        <legend v-if="title" class="md-field_header_title" v-text="title"></legend>
        <p v-if="brief" class="md-field_header_brief" v-text="brief"></p>
        <slot name="header"></slot>
      </div>
      <div class="md-field_header_action">
        <slot name="action"></slot>
      </div>
    </header>
    <div class="md-field_content">
      <slot></slot>
    </div>
    <footer class="md-field_footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </fieldset>
</template>

<script>export default {
  name: 'md-field',

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

  provide() {
    return {
      rootField: this,
    }
  },
}
</script>

<style lang="stylus">
.md-field
  padding md-field-padding-v md-field-padding-h
  border none
  background-color md-field-bg-color
  &--is-plain
    padding 0
    background-color transparent

.md-field_header
  position relative
  display flex
  align-items center
  justify-content space-between
  margin-bottom md-field-header-gap

.md-field_header_heading
  flex 1 1 0%

.md-field_header_action
  flex-shrink 0
  display inline-flex
  align-items center
  align-self flex-start
  justify-content flex-end
  margin-left md-h-gap-sm
  color md-field-action-color
  font-size md-field-action-font-size

.md-field_header_title
  color md-field-title-color
  font-size md-field-title-font-size
  font-weight md-field-title-font-weight
  line-height 1

.md-field_header_brief
  margin-top md-v-gap-xs
  color md-field-brief-color
  font-size md-field-brief-font-size
  line-height 1.4

.md-field_footer
  margin-top md-field-footer-gap

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
