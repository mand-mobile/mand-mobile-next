<script lang="ts">
import {
  h,
  Fragment,
  Teleport,
  withDirectives,
  resolveDirective,
  ref,
  defineComponent,
  onMounted,
  watch,
  vShow,
  nextTick,
} from 'vue'
import {
  randomId,
  SHOW_EVENT,
  HIDE_EVENT,
} from 'mand-mobile/utils'
import MdTransition from 'mand-mobile/transition'
import MdIcon from 'mand-mobile/icon'
import { clickOutside } from 'mand-mobile/directives'

import type { PropType, ComponentPublicInstance } from 'vue'

export default defineComponent({
  name: 'MdTip',
  directives: { clickOutside },
  props: {
    placement: {
      type: String as PropType<
        'top' | 'left' | 'bottom' | 'right'
      >,
      default: 'top',
    },
    name: {
      type: [String, Number],
      default: () => {
        return randomId('tip')
      },
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Object as PropType<{
        top: number
        left: number
      }>,
      default: () => {
        return { top: 0, left: 0 }
      },
    },
    /**
     * feature tip will not show after click
     */
    clickTrigger: {
      type: Boolean,
      default: true,
    },
    clickOutsideHide: {
      type: Boolean,
      default: true,
    },
    /**
     * feature tip will follow trigger position change
     */
    follow: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
  },
  emits: [SHOW_EVENT, HIDE_EVENT],
  setup(props, { emit, slots, expose }) {
    /**
     * show & triggerHandler
     */
    const show = ref(false)
    const triggerHandler = (flag?: boolean) => {
      setPosition()
      show.value =
        typeof flag === 'boolean' ? flag : !show.value
    }

    watch(show, (val) => {
      val ? emit(SHOW_EVENT) : emit(HIDE_EVENT)
    })

    /**
     * dom position info
     */
    const tipRef = ref<HTMLElement | null>(null)
    const arrowRef = ref<HTMLElement | null>(null)
    const arrowPosition = ref<Partial<DOMRect>>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    })

    const triggerRef =
      ref<ComponentPublicInstance | HTMLElement | null>(
        null
      )
    const triggerPosition = ref<Partial<DOMRect>>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    })

    const contentPosition = () => {
      let style: {
        top: string
        left: string
        width?: string
        height?: string
        transform?: string
      } = { top: '0', left: '0' }
      switch (props.placement) {
        case 'top':
          style = {
            width: props.fill
              ? `${triggerPosition.value.width}px`
              : 'auto',
            top: `${
              (triggerPosition.value.top || 0) -
              (arrowPosition.value?.height || 0) +
              props.offset.top
            }px`,
            left: `${
              (triggerPosition.value.left || 0) +
              (triggerPosition.value.width || 0) / 2 +
              props.offset.left
            }px`,
            transform: `translate3d(-50%, -100%, 0)`,
          }
          break
        case 'bottom':
          style = {
            width: props.fill
              ? `${triggerPosition.value.width}px`
              : 'auto',
            top: `${
              (triggerPosition.value.top || 0) +
              (triggerPosition.value.height || 0) +
              (arrowPosition.value?.height || 0) +
              props.offset.top
            }px`,
            left: `${
              (triggerPosition.value.left || 0) +
              (triggerPosition.value.width || 0) / 2 +
              props.offset.left
            }px`,
            transform: `translate3d(-50%, 0, 0)`,
          }
          break
        case 'left':
          style = {
            height: props.fill
              ? `${triggerPosition.value.height}px`
              : 'auto',
            top: `${
              (triggerPosition.value.top || 0) +
              (triggerPosition.value.height || 0) / 2 +
              props.offset.top
            }px`,
            left: `${
              (triggerPosition.value.left || 0) +
              props.offset.left
            }px`,
            transform: `translate3d(-${
              100 + (arrowPosition.value?.width || 0)
            }%, -50%, 0)`,
          }
          break
        case 'right':
          style = {
            height: props.fill
              ? `${triggerPosition.value.height}px`
              : 'auto',
            top: `${
              (triggerPosition.value.top || 0) +
              (triggerPosition.value.height || 0) / 2 +
              props.offset.top
            }px`,
            left: `${
              (triggerPosition.value.left || 0) +
              (triggerPosition.value.width || 0) +
              (arrowPosition.value?.width || 0) / 2 +
              props.offset.left
            }px`,
            transform: `translate3d(0, -50%, 0)`,
          }
          break
      }

      /**
       * fallback position
       * todo height fallback
       */
      const tipPosition =
        tipRef.value?.getBoundingClientRect() ?? {
          left: 0,
          right: 0,
          width: 0,
          height: 0,
        }
      const bodyPosition =
        document.body.getBoundingClientRect()
      /* istanbul ignore if */
      if (
        style.width === 'auto' &&
        (props.placement === 'top' ||
          props.placement === 'bottom')
      ) {
        if (
          parseInt(style.left, 10) + tipPosition.width / 2 >
          bodyPosition.width
        ) {
          const first = parseInt(style.left, 10)
          style.left = `${
            bodyPosition.width - tipPosition.width / 2
          }px`
          const secend = parseInt(style.left, 10)
          arrowRef.value &&
            (arrowRef.value.style.transform = `translate3d(${
              first - secend
            }px, 0, 0)`)
        }

        if (
          parseInt(style.left, 10) - tipPosition.width / 2 <
          0
        ) {
          const first = parseInt(style.left, 10)
          style.left = tipPosition.width / 2 + 'px'
          const secend = parseInt(style.left, 10)
          arrowRef.value &&
            (arrowRef.value.style.transform = `translate3d(${
              first - secend
            }px, 0, 0)`)
        }
      }

      return style
    }

    /**
     * init trigger dom position info
     * this first vnode is the trigger dom
     */
    const setPosition = () => {
      let triggerDom: HTMLElement | null = null
      if (
        triggerRef.value &&
        triggerRef.value instanceof HTMLElement
      ) {
        triggerDom = triggerRef.value
      } else if (triggerRef.value) {
        triggerDom = triggerRef.value.$el
      }

      const rect = triggerDom?.getBoundingClientRect()
      Object.keys(triggerPosition.value).forEach((key) => {
        ;(triggerPosition.value as any)[key] =
          rect?.[key as keyof DOMRect]
      })

      const arrowRect =
        arrowRef.value?.getBoundingClientRect()
      Object.keys(arrowPosition.value).forEach((key) => {
        ;(arrowPosition.value as any)[key] =
          arrowRect?.[key as keyof DOMRect]
      })
    }

    /**
     * init position info
     */
    onMounted(() => {
      setPosition()
    })

    /**
     * watch get arrow rect
     */
    let setPositionId: number | undefined = undefined
    /* istanbul ignore next */
    const flowHandler = () => {
      setPositionId = undefined
      if (!props.follow) return
      setPosition()
      start()
    }

    function start() {
      if (!setPositionId) {
        setPositionId =
          globalThis.requestAnimationFrame(flowHandler)
      }
    }

    function stop() {
      if (setPositionId) {
        globalThis.cancelAnimationFrame(setPositionId)
        setPositionId = undefined
      }
    }

    watch(show, () => {
      nextTick(setPosition)

      show.value ? start() : stop()
    })

    /**
     * expost methods
     */
    expose({
      triggerShow: triggerHandler,
      setPosition,
    })

    /**
     * render dom
     */
    const content = () =>
      withDirectives(
        h(
          'div',
          {
            ref: tipRef,
            class: `md-tip-content ${
              props.closable ? 'has-close' : ''
            } ${
              props.placement ? 'is-' + props.placement : ''
            } ${props.name}`,
            style: {
              ...contentPosition(),
            },
          },
          [
            props.icon
              ? h(MdIcon, {
                  class: 'content-icon',
                  name: props.icon,
                  svg: props.iconSvg,
                })
              : null,
            h(
              'div',
              { class: 'content-text' },
              props.content
            ),
            props.closable
              ? h(MdIcon, {
                  name: 'close',
                  size: 'md',
                  onClick: () => triggerHandler(false),
                })
              : null,
            h('span', {
              ref: arrowRef,
              class: 'tip-arrow',
            }),
          ]
        ),
        [[vShow, show.value]]
      )

    const tip = () =>
      h(
        Teleport,
        {
          to: 'body',
          disabled: !props.appendToBody,
        },
        [
          h(
            MdTransition,
            {
              name: 'md-fade-tip',
            },
            {
              default: content,
            }
          ),
        ]
      )

    const defaultSlots = slots.default?.() || []
    if (!defaultSlots.length) {
      console.warn(
        `Tip should have be provided at least one Element or Component into default slot.`
      )
    }

    const directiveClickOutside =
      resolveDirective('clickOutside')
    const triggerSlot = () =>
      directiveClickOutside && props.clickOutsideHide
        ? withDirectives(
            h(defaultSlots[0], {
              ref: triggerRef,
              onClick: () => {
                props.clickTrigger && triggerHandler(true)
              },
            }),
            [
              [
                directiveClickOutside,
                () => triggerHandler(false),
                tipRef.value as any,
              ],
            ]
          )
        : h(defaultSlots[0], {
            ref: triggerRef,
            onClick: () => {
              props.clickTrigger && triggerHandler(true)
            },
          })

    return () =>
      h(Fragment, null, [
        tip(),
        triggerSlot(),
        ...defaultSlots.slice(1),
      ])
  },
})
</script>

<style lang="stylus">
.md-tip-content
  position absolute
  top 0
  display flex
  align-items center
  padding var(--md-tip-padding)
  color var(--md-tip-color)
  font-size var(--md-tip-font-size)
  line-height 1.2
  border-radius var(--md-tip-radius)
  background-color #717382
  box-shadow var(--md-tip-shadow)
  z-index var(--md-tip-zindex)
  &.has-close
    padding-right 12px
  &.is-bottom
    .tip-arrow
      bottom auto
      top -10px
      border-width 0 11px 10px 11px
      border-color transparent transparent #717382 transparent
  &.is-left
    .tip-arrow
      top 50%
      right -6px
      left auto
      margin-top -11px
      border-width 11px 0 11px 10px
      border-color transparent transparent transparent #717382
  &.is-right
    .tip-arrow
      top 50%
      left 4px
      margin-top -11px
      border-width 11px 10px 11px 0
      border-color transparent #717382 transparent transparent

  .content-icon
    margin-right 14px
  .content-text
    margin-top 2px
    flex 1
  .md-icon-close
    margin-left 12px
  .tip-arrow
    position absolute
    bottom -9px
    left 50%
    margin-left -11px
    width 0
    height 0
    border-style solid
    border-width 10px 11px 0 11px
    border-color #717382 transparent transparent transparent
</style>
