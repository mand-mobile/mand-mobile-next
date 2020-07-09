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
export default {
  name: 'md-transition-uni',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      transitionClass: [],
      isShow: false,
      whenTransitionEnds: null
    }
  },
  computed: {
    inlineStyles() {
      let content = ''
      for (let prop in this.styles) {
        let key = prop.replace(/([A-Z])/g, "-$1").toLowerCase()
        content += key + ':' + this.styles[prop] + ';'
      }
      return content
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$_enterTransition()
      } else {
        this.$_leaveTransition()
      }
    }
  },
  mounted () {
    if (this.show) {
      this.isShow = true
    }
  },
  methods: {
    $_enterTransition () {
      if (!this.name) {
        return
      }
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
          this.whenTransitionEnds = () => {
            this.$_removeTransitionClass(toClass)
            this.$_removeTransitionClass(activeClass)
            this.$emit('afterEnter')
            this.whenTransitionEnds = null
          }
        })
      }, 50)
      this.isShow = true
      this.$emit('enter')
    },
    $_leaveTransition () {
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
        this.whenTransitionEnds = () => {
          this.$_removeTransitionClass(toClass)
          this.$_removeTransitionClass(activeClass)
          this.$emit('afterLeave')
          this.isShow = false
          this.whenTransitionEnds = null
        }
      })
      this.$emit('leave')
    },
    $_getTransitionClass (name) {
      return {
        enterClass: `${name}-enter`,
        enterToClass: `${name}-enter-to`,
        enterActiveClass: `${name}-enter-active`,
        leaveClass: `${name}-leave`,
        leaveToClass: `${name}-leave-to`,
        leaveActiveClass: `${name}-leave-active`
      }
    },
    $_addTransitionClass (className) {
      const index = this.transitionClass.indexOf(className)
      if (!~index) {
        this.transitionClass.push(className)
      }
    },
    $_removeTransitionClass (className) {
      const index = this.transitionClass.indexOf(className)
      if (~index) {
        this.transitionClass.splice(index, 1)
      }
    },
    $_onTransitionendEnd () {
      this.whenTransitionEnds && this.whenTransitionEnds()
    }
  }
}
</script>

<script>
import '@mand-mobile/shared/lib/style/transition.styl'
</script>

<style lang="stylus">
// @import '@mand-mobile/shared/lib/style/transition.styl'
</style>