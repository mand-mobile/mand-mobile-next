/* istanbul ignore next  */
export function triggerEvent(
  element: any,
  eventName: string,
  x: any,
  y: any,
  keyCodeOrValue?: any
) {
  const touch = {
    identifier: Date.now(),
    target: element,
    pageX: x,
    pageY: y,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  }

  const event = document.createEvent('CustomEvent') as any
  event.initCustomEvent(eventName, true, true, {})
  event.touches = [touch]
  event.targetTouches = [touch]
  event.changedTouches = [touch]
  event.keyCode = keyCodeOrValue
  event.clientX = x
  event.clientY = y
  event.pageX = x
  event.pageY = y

  element.value += keyCodeOrValue

  element.dispatchEvent(event)
}
