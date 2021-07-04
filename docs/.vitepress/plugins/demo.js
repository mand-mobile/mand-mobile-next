const MarkdownIt = require('markdown-it')
const { highlight } = require('vitepress/dist/node/markdown/plugins/highlight')
const fs = require('fs')
const { compile } = require('vue')

/**
 * @type {(md: import('markdown-it')) => void}
 */
module.exports = function demoPlugin(md) {
  const RE = /^<(script|style)(?=(\s|>|$))/i
  const DEMO_RE = /^<demo-wrapper\s+.+\s+\/?/

  md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    const data = md.__data
    const hoistedTags = data.hoistedTags || (data.hoistedTags = [])

    if (RE.test(content.trim())) {
      hoistedTags.push(content)
      return ''
    } else {
      if (DEMO_RE.test(content.trim())) {
        console.log(content)
      }
      return content
    }
  }
}
