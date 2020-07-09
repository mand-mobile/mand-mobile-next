class UniDevice {
  constructor(device) {
    this.device = device
  }
  vibrate() {
    if (/devtool/ig.test(this.device.brand)) {
      return
    }
    uni.vibrateShort()
  }
}

let globalDevice = null
export const Device = function () {
  if (!globalDevice) {
    globalDevice = new UniDevice(uni.getSystemInfoSync())
  }
  return globalDevice
}