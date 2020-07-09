import { isEmptyObject, warn } from '../util/index'

function tranverseProxyMap (proxyMap, handler, context) {
  Object.keys(proxyMap).forEach(child => {
    const source = context.$refs[child]
    const list = proxyMap[child]
    if (source && list) {
      handler(source, list)
    }
  })
}

export function createProxyApiMixin (proxyMap = {}) {
  return {
    mounted() {
      tranverseProxyMap(proxyMap, (source, list) => {
        this.$_proxyApi(source, list)
      }, this)
    },
    methods: {
      $_proxyApi(source, proxyList) {
        proxyList.forEach(api => {
          const fn = source[api]
          /* istanbul ignore else */
          if (fn && !this[api]) {
            this[api] = fn
          } else {
            warn(`${this.$options.name} proxyApi: Api method [${api}] is undefined in [${source.$options.name}] or there is a method with the same name in the current instance`, 'warn')
          }
        })
      },
    }
  }
}

export function createProxyEventsMixin (proxyMap = {}) {
  return {
    mounted() {
      tranverseProxyMap(proxyMap, (source, list) => {
        if (!isEmptyObject(this.$listeners)) {
          list = Object.keys(this.$listeners)
        }
        list.forEach(event => {
          source && this.$_proxyEvent(source, event)
        })
      }, this)
    },
    methods: {
      $_proxyEvent(source, event) {
        source.$on(event, (...args) => {
          this.$emit(event, ...args)
        })
      },
    }
  }
}