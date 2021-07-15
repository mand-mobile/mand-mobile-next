<template>
  <div class="md-codebox-wrapper">
    <div
      v-click-outside:[box]="blurHandler"
      class="md-codebox"
      :class="{
        'is-disabled': disabled,
        'is-justify': justify,
      }"
      @click="focusHandler"
    >
      <template v-if="maxlength > 0">
        <span
          v-for="i in maxlength"
          :key="i"
          :class="[
            'md-codebox-box',
            i === code.length + 1 && focused && 'is-active',
            code[i - 1] !== '' && 'is-filled',
          ]"
        >
          <template v-if="code[i - 1]">
            <template v-if="mask">
              <i class="md-codebox-dot"></i>
            </template>
            <template v-else>
              {{ code[i - 1] }}
            </template>
          </template>
          <template v-if="i === code.length + 1 && focused">
            <i class="md-codebox-blink"></i>
          </template>
        </span>
      </template>
      <template v-else>
        <input
          v-if="mask"
          type="password"
          :maxlength="maxlength"
          :value="code"
          readonly
          disabled
          :class="[
            'md-codebox-holder',
            focused && 'is-active',
          ]"
        />
        <input
          v-else
          type="text"
          :maxlength="maxlength"
          :value="code"
          readonly
          disabled
          :class="[
            'md-codebox-holder',
            focused && 'is-active',
          ]"
        />
      </template>
      <!-- hidden input -->
      <input
        v-if="system"
        ref="input"
        :value="code"
        :type="mask ? 'password' : 'text'"
        :maxlength="maxlength"
        class="md-codebox-input"
        @input="nativeInputHandler"
      />
    </div>
    <slot></slot>
    <slot
      name="keyboard"
      :focused="focused"
      :refs="numberKeyBoard"
      :inputHandler="inputHandler"
      :deleteHandler="deleteHandler"
    >
      <md-number-keyboard
        v-if="!system"
        ref="numberKeyBoard"
        v-model:visible="focused"
        class="fake-input-keyboard"
        type="simple"
        :ok-text="okText"
        :disorder="disorder"
        :is-view="isView"
        @enter="inputHandler"
        @delete="deleteHandler"
      ></md-number-keyboard>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdNumberKeyboard from 'mand-mobile/number-keyboard'
import { clickOutside } from 'mand-mobile/directives'
import {
  codeboxProps as props,
  emits,
  useCodebox,
} from './use-codebox'

export default defineComponent({
  name: 'MdCodebox',
  components: {
    MdNumberKeyboard,
  },
  directives: {
    clickOutside,
  },
  props,
  emits,
  setup(props, context) {
    const {
      code,
      focused,
      focusHandler,
      blurHandler,
      inputHandler,
      nativeInputHandler,
      deleteHandler,
      numberKeyBoardRef: numberKeyBoard,
      box,
      nativeInputRef: input,
    } = useCodebox(props, context)

    return {
      code,
      focused,
      focusHandler,
      blurHandler,
      inputHandler,
      nativeInputHandler,
      deleteHandler,
      numberKeyBoard,
      box,
      input,
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-codebox-wrapper
  .md-codebox-input
    position absolute
    left -9999px
    opacity 0

.md-codebox
  position relative
  display flex
  flex-wrap nowrap
  justify-content center
  &.is-justify
    .md-codebox-box
      flex 1 1 0%

.md-codebox-box
  position relative
  flex 0 1 var(--md-codebox-width)
  width var(--md-codebox-width)
  height var(--md-codebox-height)
  display flex
  align-items center
  justify-content center
  color var(--md-codebox-color)
  font-family var(--md-font-family-number)
  font-size var(--md-codebox-font-size)
  font-weight normal
  line-height 1.2
  margin-left "calc(%s / 2)" % var(--md-codebox-gutter)
  margin-right "calc(%s / 2)" % var(--md-codebox-gutter)

  hairline(bottom, color-border-element)
  &:first-child
    margin-left 0
  &:last-child
    margin-right 0
  &.is-active, &.is-filled
    border-color var(--md-codebox-border-active-color)

.md-codebox-blink
  display block
  height "calc(%s * 0.8)" % var(--md-codebox-height)
  width 2px
  background-color var(--md-codebox-blink-color)
  animation md-codebox-flash steps(2) 1s infinite

.md-codebox-dot
  display block
  height 10px
  width 10px
  border-radius 5px
  background-color var(--md-codebox-dot-color)

.md-codebox-holder
  pointer-events none
  height var(--md-codebox-height)
  line-height var(--md-codebox-height)
  padding 0 var(--md-codebox-holder-space)
  width 100%
  text-align center
  font-size var(--md-codebox-font-size)
  outline none
  color var(--md-codebox-color)
  letter-spacing 0.1em
  border-radius 0
  border-style solid
  border-width 0 0 var(--md-codebox-border-width) 0
  border-color var(--md-codebox-border-color)
  background none
  box-shadow none
  box-sizing border-box
  -webkit-appearance none
  -webkit-text-fill-color var(--md-codebox-color)
  &[disabled],
  &[readonly]
    opacity 1
    color var(--md-codebox-color)
    border-color var(--md-codebox-border-color)
  &.is-active
    border-color var(--md-codebox-border-active-color)

.md-codebox.is-disabled
  .md-codebox-box
    color var(--md-codebox-disabled-color)
    border-color var(--md-codebox-disabled-color)
  .md-codebox-blink
    display none
  .md-codebox-dot
    background-color var(--md-codebox-disabled-color)
  .md-codebox-holder
    color var(--md-codebox-disabled-color)
    border-color var(--md-codebox-disabled-color)

@keyframes md-codebox-flash
  from
    opacity 0
  to
    opacity 1
</style>
