<script setup lang="ts">
import MdTransition from 'mand-mobile/transition'
import MdButton from 'mand-mobile/button'
import { ref } from 'vue'

const show = ref(false)
const name = ref('md-fade')
const names = ref([
  'md-fade',
  'md-fade-up',
  'md-fade-down',
  'md-fade-left',
  'md-fade-right',
  'md-slide-up',
  'md-slide-down',
  'md-slide-left',
  'md-slide-right',
  'md-bounce',
  'md-punch',
  'md-zoom',
])

const toggle = (type: string) => {
  name.value = type
  show.value = !show.value
}
</script>

<template>
  <div class="md-example-child md-example-child-transition">
    <teleport to="body">
      <md-transition :name="name">
        <div
          v-show="show"
          class="popup"
          @click="show = false"
        >
          <p>Hello Mand Mobile</p>
        </div>
      </md-transition>
    </teleport>
    <md-button
      v-for="(name, index) in names"
      :key="index"
      @click="toggle(name)"
    >
      {{
        name
          .replace(/^md-/, '')
          .replace(/^\w/, (str) => str.toUpperCase())
          .replace(
            /\-\w/,
            (str) => ' ' + str[1].toUpperCase()
          )
      }}
    </md-button>
  </div>
</template>

<style lang="stylus">
.md-button
  margin-bottom 12px
.popup
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  display flex
  justify-content center
  align-items center
  z-index 999
  p
    padding 32px
    background color-bg-inverse
    font-size font-body-large
    border-radius radius-normal
    box-shadow 0 0 2px 0px color-primary
</style>
