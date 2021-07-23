<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="md-cashier-channel">
    <div class="choose-text">
      <p
        v-if="paymentTitle"
        class="choose-title"
        v-html="paymentTitle"
      ></p>
      <p
        v-if="paymentAmount"
        class="choose-number"
        v-html="paymentAmount"
      ></p>
      <p
        v-if="paymentDescribe"
        class="choose-describe"
        v-html="paymentDescribe"
      ></p>
    </div>
    <div class="choose-channel">
      <slot></slot>
      <div class="choose-channel-list">
        <md-radio-list
          v-model="innerValue"
          :options="!isSingle ? channels : displayChannels"
          icon-position="right"
        >
          <template #left="{ option }">
            <md-icon
              v-if="option.icon"
              :name="option.icon"
              size="lg"
            ></md-icon>
            <div v-else-if="option.img" class="item-image">
              <img :src="option.img" />
            </div>
          </template>
        </md-radio-list>
      </div>
      <div
        v-if="isSingle"
        class="choose-channel-more"
        :class="[isChannelShow ? 'active' : '']"
        @click="toggleShowAllChannel"
        v-html="moreButtonText"
      ></div>
    </div>
    <div class="md-cashier-block-btn">
      <md-button
        class="md-cashier-pay-button"
        :type="payButtonDisabled ? 'disabled' : 'primary'"
        @click="channelPayClick"
      >
        <slot name="button">{{ payButtonText }}</slot>
      </md-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdIcon from 'mand-mobile-next/icon'
import MdButton from 'mand-mobile-next/button'
import { RadioList as MdRadioList } from 'mand-mobile-next/radio'
import {
  channelProps as props,
  useChannel,
} from './use-cashier'

export default defineComponent({
  components: { MdIcon, MdRadioList, MdButton },
  props,
  emits: ['pay', 'update:modelValue'],
  setup(props, context) {
    const {
      innerValue,
      isSingle,
      currentIndex,
      isChannelShow,
      toggleShowAllChannel,
      channelPayClick,
      displayChannels,
    } = useChannel(props, context)

    return {
      innerValue,
      isSingle,
      currentIndex,
      displayChannels,

      isChannelShow,
      toggleShowAllChannel,

      channelPayClick,
    }
  },
})
</script>

<style lang="stylus">
.md-cashier-channel
  .choose-text
    position relative
    padding 65px 0 25px
    p
      text-align center
      &.choose-title
        font-size var(--md-cashier-choose-title-font-size)
        color var(--md-cashier-choose-title-color)
      &.choose-number
        margin-top 20px
        font-size var(--md-cashier-choose-amount-font-size)
        font-family var(--md-font-family-number)
        color var(--md-cashier-choose-amount-color)
        letter-spacing -2px
      &.choose-describe
        font-size var(--md-cashier-choose-describe-font-size)
        color var(--md-cashier-choose-describe-color)
  .choose-channel
    display flex
    flex-direction column
    max-height 500px
    padding 40px 0
    box-sizing border-box
    overflow auto
    .choose-channel-list
      flex 1
      transition all .5s ease-in
      overflow auto
      .md-radio-list
        margin 0 60px
        .md-cell-item-left
          margin-right 12px
          width 32px
          height 32px
        .md-cell-item-body
          min-height 84px
          padding 20px 0
        .md-cell-item-body::before
          display none
        .md-cell-item-content
          font-size 30px
    .choose-channel-more
      display flex
      justify-content center
      align-items center
      margin-top 10px
      font-size var(--md-cashier-choose-more-font-size)
      color var(--md-cashier-choose-more-color)
      text-align center
      &::after
        content ""
        position relative
        width 0
        height 0
        margin-left 10px
        border-left solid 8px transparent
        border-right solid 8px transparent
        border-top solid 8px var(--md-color-text-caption)
      &.disabled
        visibility hidden
      &.active
        &::after
          transform rotate(180deg)
    &.active
      .choose-channel-list .choose-channel-item
        display block
      .choose-channel-list
        max-height 1000px !important
</style>
