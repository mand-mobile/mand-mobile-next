import { isProd } from './env'

export const warn = (msg: string, fn = 'error') => {
  !isProd && console[fn](`[Mand-Mobile]: ${msg}`)
}
