require('./register')
const {__} = require('riot')

module.exports = function render(tagName, component, props) {
  const cleanup = require('jsdom-global')()
  const root = document.createElement(tagName)
  const element = __.defineComponent(component)({props}).mount(root)

  const html = element.root.outerHTML

  cleanup()

  return html
}