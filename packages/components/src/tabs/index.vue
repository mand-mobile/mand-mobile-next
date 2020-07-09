<template>
  <div class="md-tabs">
    <md-tab-bar
      ref="tabBar"
      :items="menus"
      :value="currentName"
      :has-ink="hasInk"
      :has-divide="hasDivide"
      :ink-length="inkLength"
      :immediate="immediate"
      :justify="justify"
      @change="$_handleTabClick"
    />
    <div class="md-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TabBar from '../tab-bar'

export default {
  name: 'md-tabs',

  components: {
    'md-tab-bar': TabBar,
  },

  props: {
    value: String,
    hasInk: {
      type: Boolean,
      default: true,
    },
    hasDivide: {
      type: Boolean,
      default: false,
    },
    inkLength: {
      type: Number,
      default: 80,
    },
    immediate: Boolean,
    justify: String
  },

  data() {
    return {
      currentName: this.value,
      prevIndex: 0,
      panes: [],
    }
  },

  watch: {
    value(val) {
      if (val !== this.currentName) {
        this.prevIndex = this.currentIndex
        this.currentName = val
      }
    },
  },

  computed: {
    menus() {
      return this.panes.map(pane => {
        return {
          name: pane.name,
          label: pane.label,
          disabled: pane.disabled,
        }
      })
    },
    currentIndex() {
      for (let i = 0, len = this.menus.length; i < len; i++) {
        if (this.menus[i].name === this.currentName) {
          return i
        }
      }
      return 0
    },
  },

  provide() {
    return {
      rootTabs: this,
    }
  },

  mounted() {
    if (!this.currentName && this.menus.length) {
      this.currentName = this.menus[0].name
    }
  },

  methods: {
    // MARK: private events
    $_handleTabClick(tab, index, prevIndex) {
      this.currentName = tab.name
      this.prevIndex = prevIndex
      this.$emit('input', tab.name)
      this.$emit('change', tab)
    },
    // MARK: private methods
    $_addPane(pane) {
      if (this.panes.indexOf(pane) === -1) {
        this.panes.push(pane)
      }
    },
    $_removePane(pane) {
      const index = this.panes.indexOf(pane)
      if (index >= 0) {
        this.panes.splice(index, 1)
      }
    },
    reflowTabBar() {
      this.$refs.tabBar.reflow()
    },
  },
}

</script>

<style lang="stylus">
.md-tabs-content
  position relative
  width 100%
  overflow hidden

.md-tab-slide-left
  &-enter
    transform translateX(100%)
  &-leave-to
    transform translateX(-100%)
.md-tab-slide-right
  &-enter
    transform translateX(-100%)
  &-leave-to
    transform translateX(100%)

.md-tab-slide-left,
.md-tab-slide-right
  &-enter
    opacity 0.01
  &-enter-active
    transition all 300ms
  &-leave-active
    position absolute
    top 0
    transition all 300ms
  &-leave-to
    opacity 0.01
</style>
