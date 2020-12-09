import { cloneDeep } from 'lodash'

export const outboundRE = /^[a-z]+:/i
export function isExternal (path) {
  return outboundRE.test(path)
}

export function resolveNavItems (site, localePath) {
  const { themeConfig } = site

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig

  return localeConfig.nav || themeConfig.nav
}

export function resolveSidebarItems (page, regularPath, site, localePath) {
  const { pages, themeConfig } = site

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar

  if (!sidebarConfig) {
    return []
  } else {
    regularPath = ensureEndingSlash(regularPath).replace(localePath, '/')

    for (const base in sidebarConfig) {
      if (regularPath.indexOf(encodeURI(base)) === 0 && sidebarConfig[base]) {
        return resolveMatchingConfig(cloneDeep(sidebarConfig[base]), pages, localePath)
      }
    }
    
    return []
  }
}

function ensureEndingSlash (path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveMatchingConfig (config, pages, localePath) {
  const flatConfig = {}
  flattenConfig(config, flatConfig)

  pages.forEach(item => {
    if (!item || !item.meta || (item.frontmatter.localePath && item.frontmatter.localePath !== localePath)) {
      return
    }

    const parentItem = flatConfig[item.meta.category]
    const currentItem = flatConfig[item.meta.name]
    if (parentItem) {
      parentItem.children = parentItem.children || []
      parentItem.children.push(item)
    } else if (currentItem) {
      flatConfig[item.meta.name] = {
        ...currentItem,
        ...item
      }
    }
  })

  return unFlattenConfig(config, flatConfig)
}

export function flattenConfig (config = [], target = {}, base = '') {
  for (let index = 0; index < config.length; index++) {
    const item = config[index]
    const name = item.name || item.meta.name

    if (!name) {
      continue
    }
    
    const key = base ? `${base}/${name}` : name
    target[key] = item

    if (Array.isArray(item.children) && item.children.length) {
      flattenConfig(item.children, target, key)
    }
  }

  return target
}

export function unFlattenConfig (config = [], source = {}, base = '') {  
  if (base.split('/').length > 1) {
    config.sort(function(a, b){
      return a.title.localeCompare(b.title)
    })
  }

  for (let index = 0; index < config.length; index++) {
    const item = config[index]
    const name = item.name

    if (!name) {
      continue
    }

    const key = base ? `${base}/${name}` : name
    
    config[index] = {
      ...source[key],
      ...item,
    }

    if (Array.isArray(item.children) && item.children.length) {
      unFlattenConfig([...item.children], source, key)
    }
  }

  return config
}

export function setScale (scale) {
  const viewPort = document.querySelector('meta[name=viewport]')

  if (!viewPort) {
    return
  }
  
  const viewPortContent = viewPort.getAttribute('content')
  const viewPortContentParts = viewPortContent.split(',')

  let newViewPortContent = ''

  for (let i = 0, len = viewPortContentParts.length; i < len; i++) {
    const attr = viewPortContentParts[i]
    if ((attr.indexOf('initial-scale') >= 0) || (attr.indexOf('maximum-scale') >= 0) || (attr.indexOf('minimum-scale') >= 0)) {
      continue
    } else {
      newViewPortContent += `${attr},`
    }
  }

  newViewPortContent += `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}`
  viewPort.setAttribute('content', newViewPortContent)
}