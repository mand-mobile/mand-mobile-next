<template>
  <md-scroll-view-primitive
    ref="scrollView"
    :height="height"
    :scrolling-x="scrollingX"
    :scrolling-y="scrollingY"
    :bouncing="bouncing"
    :auto-reflow="autoReflow"
    :manual-init="manualInit"
    :end-reached-threshold="endReachedThreshold"
    :immediate-check-end-reaching="immediateCheckEndReaching"
    :touch-angle="touchAngle"
    :is-prevent="isPrevent"
    :refresher-enable="hasRefresher"
    :more-loader-enable="hasMoreLoader"
    :styles="styles"
  >
    <div class="md-scroll-view_header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <template v-slot:refresh="{scrollTop, isRefreshing, isRefreshActive}">
      <slot name="refresh"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></slot>
    </template>
    <slot></slot>
    <template v-slot:more="{isEndReaching}">
      <slot name="more" :is-end-reaching="isEndReaching"></slot>
    </template>
    <div class="md-scroll-view_footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </md-scroll-view-primitive>
</template>

<script>
import {createProxyApiMixin, createProxyEventsMixin} from '@mand-mobile/shared/lib/mixin/proxy'
import ScrollView from './scroll-view'

export default {
  name: 'md-scroll-view',

  mixins: [
    createProxyApiMixin({
      scrollView: [
        'getSizes',
        'getOffsets',
        'scrollTo',
        'reflowScroller',
        'triggerRefresh',
        'finishRefresh',
        'finishLoadMore',
      ],
    }),
    createProxyEventsMixin({
      scrollView: ['endReached', 'refreshActive', 'refreshing', 'scroll'],
    }),
  ],

  components: {
    'md-scroll-view-primitive': ScrollView,
  },

  props: {
    scrollingX: {
      type: Boolean,
      default: true,
    },
    scrollingY: {
      type: Boolean,
      default: true,
    },
    bouncing: {
      type: [Boolean, Object],
      default: true,
    },
    autoReflow: {
      type: Boolean,
      default: false,
    },
    refresherEnable: {
      type: Boolean,
      default: false,
    },
    moreLoaderEnable: {
      type: Boolean,
      default: false,
    },
    manualInit: {
      type: Boolean,
      default: false,
    },
    endReachedThreshold: {
      type: Number,
      default: 0,
    },
    immediateCheckEndReaching: {
      type: Boolean,
      default: false,
    },
    touchAngle: {
      type: Number,
      default: 15,
    },
    height: {
      type: [Number, String],
    },
    isPrevent: {
      type: Boolean,
      default: true,
    },
    styles: {
      type: Object,
    },
  },

  computed: {
    hasRefresher() {
      return this.refresherEnable || !!(this.$slots.refresh || this.$scopedSlots.refresh)
    },
    hasMoreLoader() {
      return this.moreLoaderEnable || !!(this.$slots.more || this.$scopedSlots.more)
    },
  },
}

</script>

<style lang="stylus">
.md-scroll-view
  .md-scroll-view_header, .md-scroll-view_footer
    position absolute
    left 0
    right 0
    z-index 2
</style>