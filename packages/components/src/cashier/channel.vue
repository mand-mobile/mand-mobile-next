<template>
  <div class="md-cashier-channel">
    <div class="md-cashier-channel_choose_text">
      <p class="md-choose--title" v-if="paymentTitle" v-html="paymentTitle"></p>
      <p class="md-choose--number" v-if="paymentAmount" v-html="paymentAmount"></p>
      <p class="md-choose--describe" v-if="paymentDescribe" v-html="paymentDescribe"></p>
    </div>
    <div class="md-choose_channel" :class="{active: isChannelActive}">
      <slot></slot>
      <div class="md-choose_channel_list" v-if="isChannelShow || isSingle">
        <template v-for="(item, index) in channels">
          <md-cashier-channel-item
            :class="{default: index === defaultIndex}"
            :key="index"
            :data="item"
            :active="index === activeChannelIndex"
            @click.native="$_onChannelItemClick(item, index)"
          />
        </template>
      </div>
      <div class="md-choose_channel_list" v-else-if="channels[defaultIndex]">
        <md-cashier-channel-item
          class="default"
          :data="channels[defaultIndex]"
          active
          @click.native="$_onChannelItemClick(channels[defaultIndex], defaultIndex)"
        />
      </div>
      <div
        v-if="!isSingle"
        class="md-choose_channel--more"
        :class="{disabled: isChannelActive}"
        v-html="moreButtonText"
        @click="$_onChannelMoreClick"
      ></div>
    </div>
    <div class="md-cashier_block_btn">
      <md-button
        class="md-cashier-pay-button"
        :type="payButtonDisabled ? 'disabled': 'primary'"
        @click="$_onChannelBtnClick"
      >
        <slot name="button">{{ payButtonText }}</slot>
      </md-button>
    </div>
  </div>
</template>

<script>
import Button from '../button'
import Icon from '../icon'
import ChannelItem from './channel-item'

export default {
  name: 'md-cashier-channel',

  components: {
    'md-button': Button,
    'md-icon': Icon,
    'md-cashier-channel-item': ChannelItem,
  },

  props: [
    'paymentTitle',
    'paymentAmount',
    'paymentDescribe',
    'moreButtonText',
    'payButtonText',
    'payButtonDisabled',
    'channels',
    'channelLimit',
    'defaultIndex',
  ],

  data() {
    return {
      isChannelShow: false,
      isChannelActive: false,
      activeChannelIndex: -1,
    }
  },

  created() {
    // console.log(this.$listeners.select)
    this.activeChannelIndex = this.defaultIndex
  },

  computed: {
    isSingle() {
      if (this.channelLimit < 1) {
        return true
      }
      return !(this.channels.length > this.channelLimit)
    },
  },

  watch: {
    defaultIndex(val) {
      this.activeChannelIndex = val
    },
  },

  methods: {
    $_onChannelItemClick(item, index) {
      if (item.disabled) {
        return
      }
      this.activeChannelIndex = index
      this.$emit('select', item)
    },
    $_onChannelMoreClick() {
      if (this.isChannelActive) {
        return
      }
      this.isChannelShow = true
      this.$nextTick(() => {
        this.isChannelActive = true
      })
    },
    $_onChannelBtnClick() {
      const item = this.channels[this.activeChannelIndex]
      this.$emit('pay', item)
    },
  },
}

</script>

<style lang="stylus">
.md-cashier-channel
  &_choose_text
    clearfix()
    position relative
    padding 65px 0 25px
    p
      block()
      text-align center
      &.md-choose--title
        font-size md-cashier-choose-title-font-size
        color md-cashier-choose-title-color
      &.md-choose--number
        margin-top 20px
        font-size md-cashier-choose-amount-font-size
        font-family md-font-family-number
        color md-cashier-choose-amount-color
        letter-spacing -2px
      &.md-choose--describe
        font-size md-cashier-choose-describe-font-size
        color md-cashier-choose-describe-color
  .md-choose_channel
    clearfix()
    max-height 500px
    padding 40px 60px
    box-sizing border-box
    overflow auto
    &_list
      clearfix()
      // max-height 64px
      transition all .5s ease-in
      overflow hidden
      
    &--more
      margin-top 10px
      font-size md-cashier-choose-more-font-size
      color md-cashier-choose-more-color
      text-align center
      &:after
        content ""
        position relative
        top 20px
        width 0
        height 0
        margin-left 10px
        border-left solid 8px transparent
        border-right solid 8px transparent
        border-top solid 8px md-color-text-caption
      &.disabled
        visibility hidden
    &.active
      .md-choose_channel_list .choose-channel-item
        display block
      .md-choose_channel_list
        max-height 1000px !important
</style>
