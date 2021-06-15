<template>
  <div class="home-page">
    <!-- 顶部信息 -->
    <h1 class="md-title">
      Mand-Mobile v3
      <md-progress
        class="custom-prog"
        color="#111a34"
        :size="12"
        :value="37 / 48"
        :width="2"
      />
    </h1>
    <h1 class="md-cg-subtitle">
      面向金融场景的移动端Vue3.0组件库
    </h1>
    <div class="md-cg-logo">
      <img
        src="https://manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg"
        alt=""
      />
    </div>

    <!-- 导航面板 -->
    <div
      v-for="(category, i) in components"
      :key="i"
      class="cg-category"
      :class="{ active: category.show }"
    >
      <div
        class="cg-category-title"
        :class="{ active: category.show }"
        @click="toggleCategory(i, category)"
      >
        {{ category.name }}&nbsp;&nbsp;<span>{{
          category.text
        }}</span>
        <md-icon name="arrow-right" size="md"></md-icon>
      </div>

      <transition name="slide-fade">
        <div
          v-show="category.show"
          class="cg-category-list"
        >
          <div
            v-for="(item, j) in category.list"
            :key="j"
            class="cg-category-item"
            @click="goToComponent(item.path)"
          >
            <md-icon
              v-if="item?.complate"
              :name="'checked'"
              size="xs"
            />
            <div class="cg-category-item-inner">
              {{ item.name }} - {{ item.text }}
              <md-icon
                name="arrow-right"
                size="sm"
              ></md-icon>
            </div>
          </div>
          <div
            class="cg-category-item"
            @click="toggleCategory(i, category)"
          >
            <div class="cg-category-item-inner close">
              收起
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 底部信息 -->
    <h1 class="md-cg-copyright">
      Produced By DiDi - FDC &times; MFE
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import componentsJSON from '../packages/components.json'
import Icon from '../packages/icon/index.vue'
import Progress from '../packages/progress/index.vue'

type Item = typeof componentsJSON[0] & {
  show?: boolean
}

export default defineComponent({
  components: {
    [Icon.name]: Icon,
    [Progress.name]: Progress,
  },
  setup() {
    const router = useRouter()
    const components = reactive<Item[]>(componentsJSON)

    const goToComponent = (path: string) => {
      router.push(`${path}/demo`)
    }

    const toggleCategory = (
      index: number,
      category: Item
    ) => {
      category.show = !category.show
    }

    return {
      components,
      toggleCategory,
      goToComponent,
    }
  },
})
</script>

<style lang="stylus">
.home-page
  position relative
  min-height 100vh
  padding 20px 20px 50px
  .md-title
    position relative
    margin 20px 0
    display flex
    align-items center
    font-size font-heading-large
    font-weight font-weight-normal
    font-family DINAlternate-Bold
    color color-text-base
    span
      color color-text-base
    .custom-prog
      position relative
      top -20px
      margin-left 0.12rem
      display inline-flex
      font-size 0.12rem
  .md-cg-subtitle
    margin-bottom 30px
    font-family DINAlternate-Bold
    font-size font-body-normal
    font-weight 300
    color color-text-minor
  .md-cg-logo
    position absolute
    top -45px
    right -30px
    width 200px
    height 200px
    opacity 1
    z-index -1
    img
      width 100%
  .cg-category
    position relative
    z-index 3
    height 120px
    margin-bottom 20px
    border-radius border-width-base
    transform translate(0, 0)
    &.active
      height auto
    // box-shadow shadow-bottom
    .cg-category-title
      position relative
      z-index 2
      height 120px
      padding 0 h-gap-lg
      line-height 120px
      font-size font-heading-normal
      font-family DINAlternate-Bold
      // font-weight font-weight-medium
      color color-text-base
      box-sizing border-box
      box-shadow 0 2px 4px rgba(0, 0, 0, .08)
      background color-bg-base
      overflow hidden
      span
        font-size font-body-large
        color color-text-minor
      .md-icon
        position absolute
        right h-gap-lg
        top 50%
        transform translateY(-50%)
        transition transform .3s ease-in-out-quint
      &.active .md-icon
          transform translateY(-50%) rotate(90deg)
      &:before
        content ""
        position absolute
        left 0
        top 0
        width 4px
        height 100%
        border-radius border-width-base
        // display none
    &:nth-of-type(1) .cg-category-title:before
      background #5E83DD
    &:nth-of-type(2) .cg-category-title:before
      background #83D23A
    &:nth-of-type(3) .cg-category-title:before
      background #FF7A2E
    &:nth-of-type(4) .cg-category-title:before
      background #FFC013
    &:nth-of-type(5) .cg-category-title:before
      background #FF525D
    &:nth-of-type(6) .cg-category-title:before
      background #5E83DD
    .cg-category-list
      background #FCFCFC
      box-shadow 0 2px 4px rgba(0, 0, 0, .08)
      .cg-category-item
        position relative
        padding 0 h-gap-lg
        box-sizing border-box
        -webkit-tap-highlight-color transparent
        .md-icon-checked
          display block
          position absolute
          top 50%
          transform translate(-110%, -50%) scale(.9)
          color #17c117
        .cg-category-item-inner
          position relative
          height 100px
          line-height 100px
          font-size font-body-normal
          font-family DINAlternate-Bold
          color color-text-minor
          hairline(bottom, color-border-base)
          .md-icon
            position absolute
            right 0
            top 50%
            line-height 32px
            transform translateY(-50%)
          &.close
            text-align center
            color color-text-link
            &:before
              display none


  .md-cg-copyright
    position absolute
    left 0
    bottom 20px
    width 100%
    text-align center
    font-size font-minor-normal
    font-weight 300
    font-family DINAlternate-Bold
    color color-text-caption

.slide-fade-enter-active
  transition all .3s ease
.slide-fade-leave-active
  transition all .3s ease
.slide-fade-enter-from
  opacity 0
  transform translate3d(0, -10px, 0)
.slide-fade-leave-to
  opacity 0
</style>
