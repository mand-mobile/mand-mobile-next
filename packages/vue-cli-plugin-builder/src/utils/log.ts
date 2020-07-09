const utils = require('@vue/cli-shared-utils')

const tag = '[Mand Mobile Buildtime]'

export const info = (msg: string) => {
  utils.info(msg, tag)
}

export const error = (msg: string) => {
  utils.error(msg, tag)
}

