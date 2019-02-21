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

  it('the core gets properly exported', function() {
    const SimpleComponent = require('./tags/simple-component.riot').default

    expect(render('my-component', SimpleComponent, {message: 'hello'})).to.match(/hello/)
  })
})