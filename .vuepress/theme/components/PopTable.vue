<template>
  <transition name="slide-fade">
    <div class="md-doc-poptable" v-show="tableShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableShow: false
    }
  },
  watch: {
    value (val) {
      this.tableShow = val
    },
    tableShow (val) {
      // if (val) {
      //   $(document).bind('click', this.maskHandler)
      // } else {
      //   $(document).unbind('click', this.maskHandler)
      //   this.$emit('input', val)
      // }
    },
  },
  methods: {
    maskHandler () {
      this.tableShow = false
    }
  }
}
</script>

<style lang="stylus">
.md-doc-poptable
  position absolute
  z-index 2
  left 0
  top 0
  // width 500px
  padding 0 15px
  box-shadow 0 2px 10px rgba(0, 0, 0, .08)
  box-sizing border-box
  background-color #fff
  // border solid 1px #f0f0f0
  border-radius 8px
  overflow-y auto
  
.slide-fade-enter-active
  transition all .3s ease
.slide-fade-leave-active
  transition all .3s ease
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */
  transform translateY(-10px)
  opacity 0
</style>