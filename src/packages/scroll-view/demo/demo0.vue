<script lang="ts">
export default {
  name: 'ScrollViewDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdScrollView, {
  PullDown,
  PullUp,
} from 'mand-mobile-next/scroll-view'
import { ref } from 'vue'

const sleep = (time = 1500) =>
  new Promise((resolve, _) => {
    setTimeout(() => resolve(false), time)
  })

const list = ref(10)
const scroller = ref<any>(null)
const isfinished = ref(false)
const onItemClick = (index: number) => {
  console.log(index)
}

const pullingDownHandler = async () => {
  await sleep()
  list.value = list.value + 5
  scroller.value.finishPullDown()
}

const pullingUpHandler = async () => {
  await sleep(1000)
  list.value = list.value + 5
  scroller.value.finishPullUp()
  isfinished.value = true
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-scroll-view
      md-example-child-scroll-view-0
    "
  >
    <md-scroll-view
      ref="scroller"
      :pull-down="true"
      :pull-up="true"
      :is-finished="isfinished"
      @pulling-down="pullingDownHandler"
      @pulling-up="pullingUpHandler"
    >
      <template
        #pulldown="{
          pullDownText,
          pullDownPercent,
          isPullingDown,
        }"
      >
        <PullDown
          :is-pulling-down="isPullingDown"
          :percent="pullDownPercent"
          :pull-down-text="pullDownText"
        />
      </template>
      <div
        v-for="i in list"
        :key="i"
        class="scroll-view-item"
        @click="onItemClick(i)"
      >
        {{ i }}
      </div>
      <template #pullup="{ pullUpText }">
        <PullUp :pull-up-text="pullUpText" />
      </template>
    </md-scroll-view>
  </div>
</template>

<style lang="stylus">
.md-example-child-scroll-view-0
  .md-scroll-view
    height 40vh
    background #FFF
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 28px
    font-family DIDIFD-Medium
    border-bottom .5px solid #efefef
</style>
