<template>
  <div
    v-if="isShow"
    class="md-transition-primitive"
    :class="transitionClass"
    :style="inlineStyles"
    @animationend="$_onTransitionendEnd"
    @transitionend="$_onTransitionendEnd"
  >
    <slot></slot>
  </div>
</template>

<script>
import {flatStyleObject} from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-transition-uni',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    styles: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      transitionClass: [],
      isShow: false,
      whenTransitionEnds: {},
    }
  },
  computed: {
    inlineStyles() {
      return flatStyleObject(this.styles)
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.$_enterTransition()
      } else {
        this.$_leaveTransition()
      }
    },
  },
  mounted() {
    if (this.show) {
      this.isShow = true
    }
  },
  methods: {
    $_enterTransition() {
      if (!this.name) {
        return
      }

      /**
       * Clear the hook registered in the previous step, because the closing 
       * of "isShow" is a delayed operation that will cause the state to be 
       * disordered when clicke quickly
       */
      this.$_onTransitionendEnd()

      const animationClass = this.$_getTransitionClass(this.name)
      const startClass = animationClass.enterClass
      const activeClass = animationClass.enterActiveClass
      const toClass = animationClass.enterToClass
      this.$emit('beforeEnter')
      this.$emit('before-enter')
      this.$_addTransitionClass(startClass)
      setTimeout(() => {
        this.$_addTransitionClass(activeClass)
        this.$nextTick(() => {
          this.$_removeTransitionClass(startClass)
          this.$_addTransitionClass(toClass)
          this.whenTransitionEnds.enter = () => {
            this.$_removeTransitionClass(toClass)
            this.$_removeTransitionClass(activeClass)
            this.$emit('afterEnter')
            this.$_abortTransition('enter')
          }
        })
      }, 50)
      this.isShow = true
      this.$emit('enter')
    },
    $_leaveTransition() {
      if (!this.name) {
        return
      }

      const animationClass = this.$_getTransitionClass(this.name)
      const startClass = animationClass.leaveClass
      const activeClass = animationClass.leaveActiveClass
      const toClass = animationClass.leaveToClass
      this.$emit('beforeLeave')
      this.$emit('before-leave')
      this.$_addTransitionClass(startClass)
      this.$_addTransitionClass(activeClass)
      this.$nextTick(() => {
        this.$_removeTransitionClass(startClass)
        this.$_addTransitionClass(toClass)
        this.whenTransitionEnds.leave = () => {
          this.$_removeTransitionClass(toClass)
          this.$_removeTransitionClass(activeClass)
          this.$emit('afterLeave')
          this.isShow = false
          this.$_abortTransition('leave')
        }
      })
      this.$emit('leave')
    },
    $_abortTransition(type) {
      if (type) {
        delete this.whenTransitionEnds[type]
      } else {
        this.whenTransitionEnds = {}
      }
    },
    $_getTransitionClass(name) {
      return {
        enterClass: `${name}-enter`,
        enterToClass: `${name}-enter-to`,
        enterActiveClass: `${name}-enter-active`,
        leaveClass: `${name}-leave`,
        leaveToClass: `${name}-leave-to`,
        leaveActiveClass: `${name}-leave-active`,
      }
    },
    $_addTransitionClass(className) {
      const index = this.transitionClass.indexOf(className)
      if (!~index) {
        this.transitionClass.push(className)
      }
    },
    $_removeTransitionClass(className) {
      const index = this.transitionClass.indexOf(className)
      if (~index) {
        this.transitionClass.splice(index, 1)
      }
    },
    $_onTransitionendEnd() {
      const {enter, leave} = this.whenTransitionEnds
      enter && enter.call(this)
      leave && leave.call(this)
    },
  },
}

</script>

<style lang="stylus">
@import '~@mand-mobile/shared/lib/style/transition.styl'
</style>