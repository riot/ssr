const register = require('../register')
const {expect} = require('chai')
const render = require('../')

describe('ssr', () => {
  let unregister // eslint-disable-line

  before(() => {
    unregister = register()
  })

  after(() => {
    unregister()
  })

  it('raw components can be rendered', function() {
    const SimpleComponent = require('./tags/simple-component.riot').default

    expect(render('my-component', SimpleComponent, {message: 'hello'})).to.match(/<p>hello/)
  })

  it('nested components can be rendered', function() {
    const ParentComponent = require('./tags/parent-component.riot').default

    expect(render('my-component', ParentComponent)).to.match(/<p>hello/)
  })
})