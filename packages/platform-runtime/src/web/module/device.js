import {getDpr} from '@mand-mobile/shared/lib/util'

class WebDevice {
  constructor() {
    this.device = {}
    this.device.pixelRatio = getDpr()
  }
  vibrate() {}
}

let globalDevice = null
export const Device = function() {
  if (!globalDevice) {
    globalDevice = new WebDevice()
  }
  return globalDevice
}
