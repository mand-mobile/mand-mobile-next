import {getDpr} from 'mand-mobile/_util'

class WebDevice {
  device = {}
  constructor() {
    this.device.pixelRatio = getDpr()
  }
  vibrate() {}
}

let globalDevice = null
export const Device = function () {
  if (!globalDevice) {
    globalDevice = new WebDevice()
  }
  return globalDevice
}