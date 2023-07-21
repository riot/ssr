import { expect } from 'chai'
import render, {
  renderAsync,
  renderAsyncFragments,
  fragments,
  asyncRenderTimeout,
  domGlobals,
} from '../index.js'

describe('ssr', () => {
  afterEach(() => {
    domGlobals.clear()
  })

  it('creates and deletes globals properly', () => {
    expect(globalThis.window).to.be.not.ok
    expect(globalThis.document).to.be.not.ok
    expect(globalThis.Node).to.be.not.ok

    domGlobals.create()

    expect(globalThis.window).to.be.ok
    expect(globalThis.document).to.be.ok
    expect(globalThis.Node).to.be.ok

    domGlobals.clear()

    expect(globalThis.window).to.be.not.ok
    expect(globalThis.document).to.be.not.ok
    expect(globalThis.Node).to.be.not.ok
  })

  it('raw components can be rendered', async () => {
    const { default: SimpleComponent } = await import(
      './tags/simple-component.riot'
    )

    expect(
      render('my-component', SimpleComponent, { message: 'hello' }),
    ).to.match(/<p>hello/)
  })

  it('raw components can be rendered as div', async () => {
    const { default: SimpleComponent } = await import(
      './tags/simple-component.riot'
    )
    const result = render('div', SimpleComponent, { message: 'hello' })
    expect(result).to.match(/<p>hello/)
    expect(result).to.match(/is="simple-component"/)
  })

  it('the whole DOM can be rendered', async () => {
    const { default: RootApp } = await import('./tags/root-app.riot')
    const result = render('html', RootApp)

    expect(result).to.be.equal(
      '<!doctype html><html><head><title>hello</title><meta content="a description" name="description"></head><body><p>hello</p><script src="https://path.to/riot.js"></script></body></html>',
    )
  })

  it('nested components can be rendered', async () => {
    const { default: ParentComponent } = await import(
      './tags/parent-component.riot'
    )

    expect(render('my-component', ParentComponent)).to.match(/<p>hello/)
  })

  it('can get rendered css and html', async () => {
    const { default: ParentComponent } = await import(
      './tags/parent-component.riot'
    )
    const { html, css } = fragments('my-component', ParentComponent)

    expect(html).to.match(/<p>hello/)
    expect(css).to.match(/red/)
  })

  it('can render inputs', async () => {
    const { default: InputComponent } = await import('./tags/simple-input.riot')
    const result = render('div', InputComponent)

    expect(result).to.match(/value="test"/)
    expect(result).to.match(/value="static-value"/)
    expect(result).to.match(/checked[^>]+type="checkbox"/)
    expect(result).to.match(/checked[^>]+type="radio"/)
  })

  it('omits password inputs', async () => {
    const { default: InputComponent } = await import(
      './tags/password-input.riot'
    )
    const result = render('div', InputComponent)
    expect(result).to.match(/input value=""/)
    expect(result).to.match(/value=""[^>]+type="password"/)
  })

  it('render async a component', async () => {
    const { default: AsyncSuccess } = await import('./tags/async-success.riot')
    const html = await renderAsync('div', AsyncSuccess)
    expect(html).to.match(/<p>hello/)
  })

  it('render async fragments a component', async () => {
    const { default: AsyncSuccess } = await import('./tags/async-success.riot')
    const { html } = await renderAsyncFragments('div', AsyncSuccess)
    expect(html).to.match(/<p>hello/)
  })

  it('render async a component using promises', async () => {
    const { default: AsyncAwaitSuccess } = await import(
      './tags/async-await-success.riot'
    )
    const html = await renderAsync('div', AsyncAwaitSuccess)
    expect(html).to.match(/<p>hello/)
  })

  it('fail if an async rendering times out', async function () {
    this.timeout(asyncRenderTimeout + 1000)

    const { default: AsyncTimeout } = await import('./tags/async-timeout.riot')
    return renderAsync('div', AsyncTimeout).catch((error) => {
      expect(error.message).to.match(/Timeout error/)
    })
  })

  it("fail if an async rendering can't be executed", async () => {
    const { default: InputComponent } = await import(
      './tags/password-input.riot'
    )

    expect(() => renderAsync('div', InputComponent)).to.throw()
  })

  it('does not pollute global scope with dom implementation', () => {
    expect(globalThis.window).to.be.undefined
  })
})
