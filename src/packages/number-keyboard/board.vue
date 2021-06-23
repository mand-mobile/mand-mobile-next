<template>
  <div class="md-number-keyboard-container">
    <div class="keyboard-key">
      <md-number-keyboard-item
        v-for="(item, index) in keyNumberList"
        :key="item"
        :no-touch="item !== EMPTY_KEY"
        class="keyboard-key-item"
        :class="{
          'large-item':
            keyNumberList.length === 11 && index === 9,
          'no-bg': item === EMPTY_KEY,
          slidedown: item === SLIDEDOWN_KEY,
          delete: item === DELETE_KEY,
        }"
        @press="onNumberKeyClick(item)"
      >
        <template
          v-if="
            [DELETE_KEY, SLIDEDOWN_KEY].indexOf(
              `${item}`
            ) === -1
          "
          >{{ item }}</template
        >
      </md-number-keyboard-item>
    </div>
    <div
      v-if="type === 'professional'"
      class="keyboard-operate"
    >
      <md-number-keyboard-item
        class="keyboard-operate-item delete"
        @press="onNumberKeyClick(DELETE_KEY)"
      ></md-number-keyboard-item>
      <md-number-keyboard-item
        class="keyboard-operate-item confirm"
        @press="onNumberKeyClick(CONFIRM_KEY)"
        >{{ okText }}</md-number-keyboard-item
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import MdNumberKeyboardItem from './key.vue'
import type { PropType } from 'vue'
import { t } from 'mand-mobile/locale'

export default defineComponent({
  name: 'MdNumberKeyboardContainer',
  components: {
    MdNumberKeyboardItem,
  },
  props: {
    type: {
      type: String as PropType<'professional' | 'simple'>,
      default: 'professional',
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: t('md.number_keyboard.confirm'),
    },
    hideDot: {
      type: Boolean,
      default: false,
    },
    isView: {
      type: Boolean,
      default: false,
    },
    textRender: {
      type: Function,
      default: null,
    },
  },
  emits: ['enter', 'confirm', 'hide', 'delete'],
  setup(props, { emit }) {
    const DELETE_KEY = 'delete'
    const SLIDEDOWN_KEY = 'slidedown'
    const EMPTY_KEY = ''
    const CONFIRM_KEY = 'confirm'

    const keyNumberList = computed(() => {
      let baseStack: Array<string | number> = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
      ]

      if (props.disorder) shuffle(baseStack)

      if (props.type === 'professional') {
        if (!props.hideDot) {
          baseStack.splice(9, 0, '.')
        }

        if (props.isView) {
          baseStack.push(SLIDEDOWN_KEY)
        } else {
          baseStack.push('')
        }
      } else if (props.type === 'simple') {
        baseStack.splice(9, 0, EMPTY_KEY)
        baseStack.push(DELETE_KEY)
      }

      if (props.textRender) {
        baseStack = baseStack.map(
          (key) => props.textRender(key) || key
        )
      }

      return baseStack
    })

    function onNumberKeyClick(key: string | number) {
      if (key === DELETE_KEY) {
        emit('delete')
      } else if (key === SLIDEDOWN_KEY) {
        emit('hide')
      } else if (key === CONFIRM_KEY) {
        emit('confirm')
      } else {
        emit('enter', key)
      }
    }

    function shuffle(array: Array<any>) {
      let j, x, i
      for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i)
        x = array[i - 1]
        array[i - 1] = array[j]
        array[j] = x
      }
    }

    return {
      DELETE_KEY,
      SLIDEDOWN_KEY,
      EMPTY_KEY,
      keyNumberList,
      CONFIRM_KEY,
      onNumberKeyClick,
    }
  },
})
</script>

<style lang="stylus">
.md-number-keyboard-container
  position relative
  display flex
  overflow hidden
  -webkit-user-select none
  -webkit-tap-highlight-color transparent

  .keyboard-key
    position relative
    background number-keyboard-bg
    flex 3
    display flex
    flex-wrap wrap

    .keyboard-key-item
      position relative
      flex-basis 33.33%
      height 107px
      font-size number-keyboard-key-font-size
      font-weight number-keyboard-key-font-weight
      font-family font-family-number

      &.no-bg
        background transparent

      &.delete
        background transparent url("./images/keyboard-del.png") center no-repeat
        background-size 46px

      &.slidedown
        background number-keyboard-key-bg url("./images/keyboard-hide.png") center no-repeat
        background-size 54px

      &.large-item
        flex-grow 1

      &:active, &.active
        background-color number-keyboard-key-bg-tap

  .keyboard-operate
    position relative
    flex 1
    display flex
    flex-direction column

    .keyboard-operate-item
      position relative
      flex 1

      &.delete
        background number-keyboard-key-bg url("./images/keyboard-del.png") center no-repeat
        background-size 42px
        &.active
          background-color number-keyboard-key-bg-tap
      &.confirm
        color number-keyboard-key-confirm-color
        font-size font-caption-large
        background number-keyboard-key-confirm-bg
        &.active
          background-color number-keyboard-key-confirm-bg-tap
</style>
