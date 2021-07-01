const register = require('../register')
const {expect} = require('chai')
const ssr = require('../')
const render = ssr.default
const { renderAsync, renderAsyncFragments, fragments, asyncRenderTimeout } = ssr

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

  it('the whole DOM can be rendered', function() {
    const RootApp = require('./tags/root-app.riot').default
    const result = render('html', RootApp)

    expect(result).to.be.equal('<!doctype html><html><head><title>hello</title><meta content="a description" name="description"></head><body><p>hello</p><script src="https://path.to/riot.js"></script></body></html>')
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
    expect(result).to.match(/checked[^>]+type="checkbox"/)
    expect(result).to.match(/checked[^>]+type="radio"/)
  })

  it('omits password inputs', function(){
    const InputComponent = require('./tags/password-input.riot').default
    const result = render('div', InputComponent)
    expect(result).to.match(/input value=""/)
    expect(result).to.match(/value=""[^>]+type="password"/)
  })

  it('render async a component', function(done) {
    const AsyncSuccess = require('./tags/async-success.riot').default
    renderAsync('div', AsyncSuccess).then(html => {
      expect(html).to.match(/<p>hello/)
      done()
    })
  })

  it('render async fragments a component', function(done) {
    const AsyncSuccess = require('./tags/async-success.riot').default
    renderAsyncFragments('div', AsyncSuccess).then(({html}) => {
      expect(html).to.match(/<p>hello/)
      done()
    })
  })

  it('render async a component using promises', function(done) {
    const AsyncAwaitSuccess = require('./tags/async-await-success.riot').default
    renderAsync('div', AsyncAwaitSuccess).then(html => {
      expect(html).to.match(/<p>hello/)
      done()
    })
  })

  it('fail if an async rendering times out', function(done) {
    this.timeout(asyncRenderTimeout + 1000)

    const AsyncTimeout = require('./tags/async-timeout.riot').default
    renderAsync('div', AsyncTimeout).catch(error => {
      expect(error.message).to.match(/Timeout error/)
      done()
    })
  })

  it('fail if an async rendering can\'t be executed', function() {
    const InputComponent = require('./tags/password-input.riot').default

    expect(() => renderAsync('div', InputComponent)).to.throw()
  })

  it('can require and render legacy .tag file', function(){
    unregister()
    unregister = register({ exts: ['.tag'] })
    const LegacyComponent = require('./tags/legacy.tag').default
    const result = render('div', LegacyComponent, {message:'tag file rendered successfully'})
    expect(result).to.match(/tag file rendered successfully/)
  })

  it('does not pollute global scope with dom implementation', function(){
    expect(global.window).to.be.undefined
  })
})