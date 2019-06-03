const register = require('../register')
const {expect} = require('chai')
const ssr = require('../')
const render = ssr.default
const fragments = ssr.fragments

describe('ssr', () => {
  let unregister // eslint-disable-line

  before(() => {
    unregister = register({ exts: ['.riot', '.tag'] })
  })

  after(() => {
    unregister()
  })

  it('raw components can be rendered', function() {
    const SimpleComponent = require('./tags/simple-component.riot').default

    expect(render('my-component', SimpleComponent, {message: 'hello'})).to.match(/<p>hello/)
  })

  it('raw components can be rendered as div', function() {
    const SimpleComponent = require('./tags/simple-component.riot').default
    const result = render('div', SimpleComponent, {message: 'hello'})
    expect(result).to.match(/<p>hello/)
    expect(result).to.match(/is="simple-component"/)
  })

  it('nested components can be rendered', function() {
    const ParentComponent = require('./tags/parent-component.riot').default

    expect(render('my-component', ParentComponent)).to.match(/<p>hello/)
  })

  it('can get rendered css and html', function() {
    const ParentComponent = require('./tags/parent-component.riot').default
    const { html, css } = fragments('my-component', ParentComponent)

    expect(html).to.match(/<p>hello/)
    expect(css).to.match(/red/)
  })

  it('can render inputs', function(){
    const InputComponent = require('./tags/simple-input.riot').default
    const result = render('div', InputComponent)
    expect(result).to.match(/value="test"/)
    expect(result).to.match(/type="checkbox"(.*)checked/)
    expect(result).to.match(/type="radio"(.*)checked/)
  })

  it('omits password inputs', function(){
    const InputComponent = require('./tags/password-input.riot').default
    const result = render('div', InputComponent)
    expect(result).to.match(/input value=""/)
    expect(result).to.match(/type="password"(.*)value=""/)
  })

  it('can require and render legacy .tag file', function(){
    const LegacyComponent = require('./tags/legacy.tag').default
    const result = render('div', LegacyComponent, {message:'tag file rendered successfully'})
    expect(result).to.match(/tag file rendered successfully/)
  })

})