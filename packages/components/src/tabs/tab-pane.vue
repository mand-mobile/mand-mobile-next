<template>
  <md-transition :show="active" :name="transitionName">
    <div
      class="md-tab-pane"
      role="tabpanel"
      :tab="name"
    >
      <slot></slot>
    </div>
  </md-transition>
</template>

<script>
import Transition from '../transition'

export default {
  name: 'md-tab-pane',

  components: {
    'md-transition': Transition
  },

  inject: {
    rootTabs: {
      from: 'rootTabs',
      default() {
        /* istanbul ignore next */
        return this.$parent
      },
    },
  },

  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },

  // data() {
  //   return {
  //     active: false,
  //     names: {
  //       a: this.rootTabs.currentName,
  //       b: this.name
  //     }
  //   }
  // },

  computed: {
    active() {
      return this.rootTabs.currentName === this.name
    },
    transitionName() {
      return this.rootTabs.prevIndex > this.rootTabs.currentIndex ? 'md-tab-slide-right' : 'md-tab-slide-left'
    },
    paneData() {
      return new Proxy({}, {
        get: (target, prop) => {
          return this[prop]
        }
      })
    }
  },

  watch: {
    label() {
      this.rootTabs.$forceUpdate()
    },
    disabled() {
      this.rootTabs.$forceUpdate()
    },
  },

  created() {
    this.rootTabs.$_addPane(this.paneData)
    // this.rootTabs.$_addPane(this)
  },
  destroyed() {
    this.rootTabs.$_removePane(this.paneData)
    // this.rootTabs.$_removePane(this)
  },
}

</script>

<style lang="stylus">
.md-tab-pane
  position relative
  width 100%
  transform translateZ(0)
</style>
