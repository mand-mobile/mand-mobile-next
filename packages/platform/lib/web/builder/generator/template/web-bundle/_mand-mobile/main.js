import '@mand-mobile/shared/lib/style/global.styl'
// import {transformCamelCase, warn} from './_util'


// example: import Button from '@mand-mobile/components/src/button'
<% components.forEach((component) => { %>
 import <%- component.camelCaseStyledName %> from '@mand-mobile/components/src/<%- component.dashedStyledName %>'
<% }) %>


warn(
  'You are using a whole package of mand-mobile, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  'warn',
)

/* global MAN_VERSION */
// const version = /* @echo MAN_VERSION */ MAN_VERSION

/**
 * example const components = {
 *    Button,
 *    Icon,
 * }
 */
export const components = {
  <% components.forEach((component) => { %>
    <%- component.camelCaseStyledName %>,
  <% }) %>
}

// Define plugin installation method
const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }

  // Register global components
  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component) // kebab-case
      Vue.component(transformCamelCase(`-${component.name}`), component) // PascalCase
    }
  })

  // Mount to prototype
  // @fixme 为全局注入单例模式的相关组件
  // Vue.prototype.$toast = Toast
  // Vue.prototype.$dialog = Dialog
  // Vue.prototype.$actionsheet = ActionSheet
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/**
 * @example
 * export {
    install,
    version,
    Button,
    Icon,
  }
 */
export {
  install,
  // version,
  <% components.forEach((component) => { %>
    <%- component.camelCaseStyledName %>,
  <% }) %>
}

/**
 * @example
 * export default {
    install,
    version,
    Button,
    Icon,
  }
 */
export default {
  install,
  // version,
  <% components.forEach((component) => { %>
    <%- component.camelCaseStyledName %>,
  <% }) %>
}
