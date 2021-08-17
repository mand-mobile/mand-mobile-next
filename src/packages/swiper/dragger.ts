/**
 * fade handler
 */
export class Dragger {
  draging: boolean
  startX: number
  startY: number
  isPrevent = true
  $el: HTMLElement
  dragHandler: (e: TouchEvent) => void
  startHandler: (e: TouchEvent) => void
  endHandler: (e: TouchEvent) => void

  /**
   * reactive object,so that it does not need to emit event
   */
  position: {
    x: number
    y: number
    deltaX: number
    draging: boolean
  } | null

  constructor(
    el: HTMLElement,
    position: {
      x: number
      y: number
      deltaX: number
      draging: boolean
    }
  ) {
    this.draging = false
    this.$el = el
    this.startX = 0
    this.startY = 0
    this.position = position

    this.dragHandler = (e: TouchEvent) => this.onDrag(e)

    this.startHandler = (e: TouchEvent) =>
      this.onDragStart(e)
    this.endHandler = (e: TouchEvent) => this.onDragEnd(e)

    this.initEvent()
  }

  initEvent() {
    this.$el.addEventListener(
      'touchstart',
      this.startHandler
    )
    this.$el.addEventListener('touchmove', this.dragHandler)
    this.$el.addEventListener('touchend', this.endHandler)
  }

  onDragStart(e: TouchEvent) {
    this.draging = true
    this.position && (this.position.draging = true)
    this.preventHandler(e)
    this.startX = e.touches[0].pageX
    this.startY = e.touches[0].pageY
  }

  onDrag(e: TouchEvent) {
    this.draging = true
    this.position && (this.position.draging = true)
    this.preventHandler(e)
    if (e.touches[0] && this.position) {
      this.position.x = e.touches[0].pageX
      this.position.y = e.touches[0].pageY
    }
  }

  onDragEnd(e: TouchEvent) {
    this.draging = false
    this.position && (this.position.draging = false)
    this.preventHandler(e)
    this.position &&
      (this.position.deltaX = this.position.x - this.startX)
  }

  preventHandler(e: TouchEvent) {
    if (!this.isPrevent) return
    e.preventDefault()
    e.stopPropagation()
  }

  destory() {
    this.$el.removeEventListener(
      'touchstart',
      this.startHandler
    )
    this.$el.removeEventListener(
      'touchmove',
      this.dragHandler
    )
    this.$el.removeEventListener(
      'touchend',
      this.endHandler
    )
    this.position = null
  }
}
