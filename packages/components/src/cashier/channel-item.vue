<template>
  <div class="md-cashier-channel-item">
    <div class="md-cashier-channel-item_icon" :class="data.icon" v-if="data.icon">
      <md-icon :name="data.icon" size="lg"></md-icon>
    </div>
    <div class="md-cashier-channel-item_image" v-else-if="data.img">
      <img :src="data.img">
    </div>
    <div class="md-cashier-channel-item_label">
      <p class="md-cashier-channel-item_label_title">
        <span v-html="data.text || data"></span>
        <span
          v-if="data.action"
          class="md-active"
          v-html="data.action.text"
          @click.stop="data.action.handler"
        ></span>
      </p>
      <p
        class="md-cashier-channel-item_label_desc"
        v-if="data.desc"
        v-html="data.desc"
      ></p>
    </div>
    <div class="md-cashier-channel-item_check_icon">
      <md-icon
        v-if="data.disabled"
        name="check-disabled"
      ></md-icon>
      <md-icon
        v-else-if="active"
        name="checked"
      ></md-icon>
      <md-icon
        v-else
        name="check"
      ></md-icon>
    </div>
  </div>
</template>

<script>
import Icon from '../icon'

export default {
  name: 'md-cashier-channel-item',

  components: {
    'md-icon': Icon,
  },

  props: {
    data: {
      type: Object,
      default() {
        /* istanbul ignore next */
        return {}
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="stylus">
.md-cashier-channel-item
  block()
  position relative
  padding 20px 40px 20px 0
  box-sizing border-box
  // display flex
  // align-items center
  &_icon, &_image
    position relative
    float left
    width 32px
    height 32px
    margin 6px 0
  &_image img
    block() 
  &_label
    float left
    margin-left md-h-gap-sm
    &_title
      font-size md-cashier-choose-channel-title-font-size
      color md-cashier-choose-channel-title-color
      .md-active
        padding-left md-h-gap-sm
        font-size md-cashier-choose-channel-title-action-font-size
        color md-cashier-choose-channel-title-action-color
    &_desc
      margin-top md-v-gap-xs
      font-size md-cashier-choose-channel-desc-font-size
      color md-cashier-choose-channel-desc-color
  &_check_icon
    position absolute
    top 50%
    right 0
    transform translateY(-50%)
    .md-icon
      display flex
      color md-color-text-placeholder
      &.md-icon-checked
        color md-cashier-choose-channel-icon-color
</style>
