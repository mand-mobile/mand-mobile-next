import Vue from 'vue'

// Development environment
export const isProd = process.env.NODE_ENV === 'production'

// isinminiprograme
export const ismp = typeof Page === 'function' && typeof Component === 'function'

// Browser environment sniffing
export const root = (typeof window !== 'undefined' ? window : global) || {}

// browser, miniapp, server
export const inBrowser = (!Vue.prototype.$isServer || typeof window !== 'undefined') && !!(root as any).history
export const UA = inBrowser && (root as any).navigator && (root as any).navigator.userAgent.toLowerCase()
export const isAndroid = inBrowser && UA && UA.indexOf('android') > 0
export const isIOS = inBrowser && UA && /iphone|ipad|ipod|ios/.test(UA)
export const isWeChatDevTools = UA && /wechatdevtools/.test(UA)
