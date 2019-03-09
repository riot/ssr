require('./register')
const riot = require('riot')

module.exports = function render(tagName, component, props) {
  const cleanup = require('jsdom-global')()
  const root = document.createElement(tagName)
  const element = riot.component(component)(root, props)

  const html = element.root.outerHTML

  cleanup()

  return html
}