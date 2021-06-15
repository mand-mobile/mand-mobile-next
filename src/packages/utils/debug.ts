import { isProd } from './env'

interface IConsole extends Console {
  [key: string]: any
}

const logger: IConsole = console

export const warn = (msg: string, fn = 'error') => {
  !isProd && logger[fn](`[Mand-Mobile]: ${msg}`)
}
