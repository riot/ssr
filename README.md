# ssr

[![Riot.js SSR logo](https://raw.githubusercontent.com/riot/branding/main/ssr/ssr-horizontal.svg)](https://github.com/riot/ssr/)

Riot module to render riot components on the server

[![Build Status][ci-image]][ci-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

# Installation

```
npm i -S riot @riotjs/compiler @riotjs/ssr
```

# Usage

### render - to render only markup

You can simply render your components' markup as it follows:

```js
import MyComponent from './my-component.js'
import render from '@riotjs/ssr'

const html = render('my-component', MyComponent, { some: 'initial props' })
```

_Important_ If you want to import raw `.riot` components in your application you might want to [read this](https://github.com/riot/ssr#register---to-load-riot-components-in-node)

_Notice_ that components rendered on the server will **always automatically receive the `isServer=true` property**.

### renderAsync - to handle asynchronous rendering

Components that can not be rendered synchronously must expose the `onAsyncRendering` method to the `renderAsync` function. For example:

```riot
<async-component>
  <p>{ state.username }<p>

  <script>
    export default {
      onBeforeMount({ isServer }) {
        // if it's not SSR we load the user data right the way
        if (!isServer) {
          this.loadUser()
        }
      },
      loadUser() {
        return fetch('/user/name').then(({name}) => {
          this.update({ name })
        })
      },
      // this function will be automatically called only
      // if the component is rendered via `renderAsync`
      onAsyncRendering() {
        return this.loadUser()
      }
    }
  </script>
</async-component>
```

The above component can be rendered on the server as it follows:

```js
import MyComponent from './async-component.js'
import { renderAsync } from '@riotjs/ssr'

renderAsync('async-component', MyComponent, { some: 'initial props' }).then(
  (html) => {
    console.log(html)
  },
)
```

Notice that the `onAsyncRendering` can either return a promise or use the resolve, reject callbacks:

```js
export default {
  // this is ok
  async onAsyncRendering() {
    await loadData()
  },
}
```

```js
export default {
  // this is also ok
  onAsyncRendering(resolve, reject) {
    setTimeout(resolve, 1000)
  },
}
```

**IMPORTANT** nested `onAsyncRendering` on children components are not supported!

### fragments - to render html and css

You can also extract the rendered `html` and `css` separately using the `fragments` function:

```js
import MyComponent from './my-component.js'
import { fragments } from '@riotjs/ssr'

const { html, css } = fragments('my-component', MyComponent, {
  some: 'initial props',
})
```

### renderAsyncFragments - to handle asynchronous fragments rendering

It works like the method above but asynchronously

### Advanced tips

If you want to render your whole document you can simply pass `html` as name of your root node. For example

```riot
<html>
    <head>
        <title>{ state.message }</title>
        <meta each={ meta in state.meta } {...meta}/>
    </head>

    <body>
        <p>{ state.message }</p>
        <script src='path/to/a/script.js'></script>
    </body>

    <script>
        export default {
          state: {
            message: 'hello',
            meta: [{
              name: 'description',
              content: 'a description'
            }]
          }
        }
    </script>
</html>
```

It can be rendered as it follows:

```js
import MyRootApplication from './my-root-application.js'
import render from '@riotjs/ssr'

const html = render('html', MyRootApplication)
```

### Better SSR control using the createRenderer

For a better control over your HTML rendering you might want to use the `createRenderer` factory function.
This method allows the creation of a rendering function receiving the `{getHTML, css, dispose, element}` option object.

- `getHTML`: give you the rendered html of your component as string
- `css`: the css of your component as string
- `dispose`: clean the memory used on the server needed to render your component
- `element`: the component instance you are mounting

For example

```js
import MyComponent from './my-component.js'
import { createRenderer } from '@riotjs/ssr'

const logRendrer = createRenderer(({ getHTML, getCSS, dispose, component }) => {
  const html = getHTML()
  const css = getCSS()

  console.log('Rendering the component: %s', component.name)

  dispose()
  return { html, css }
})

// use your logRenderer
const { html, css } = logRendrer('my-component', MyComponent, {
  some: 'initial props',
})
```

### DOM Globals

`@riotjs/ssr` needs DOM globals (like `window`, `document` ...) to properly render your markup.
With the `domGlobals` exported object you can decide manually when the globals should be created and deleted from in your node applications.

```js
import { domGlobals } from '@riotjs/ssr'

domGlobals.create()

// global DOM object in your node environement are now defined
console.log(global.window, global.document)

// they will be cleared and will be undefined
domGlobals.clear()
```

### register - to load riot components in node

If you only want to load directly your `riot` components in your node application you might have a look at [`@riotjs/register`](https://github.com/riot/register)
For example:

```js
import register from '@riotjs/register'

import MyComponent from './my-component.riot' // It will fail

// from now on you can load `.riot` tags in node
const unregister = register()

import MyComponent from './my-component.riot' // it works!

// normally you will not need to call this function but if you want you can unhook the riot loader
unregister()
```

#### Caveat

If you are rendering your whole HTML you will not be able to use multiple times the inline `<script>` `<style>` tags.
Of course, you can use only once the ones used by Riot.js to customize your components. For example:

```riot
<html>
    <head>
        <!-- allowed -->
        <script src='path/to/some/script.js'></script>

        <!-- not allowed -->
        <style>
        </style>

        <!-- not allowed -->
        <script>
            const globalstuff = {}
        </script>
    </head>

    <body>
        <!-- application html -->
    </body>

    <!-- allowed -->
    <script>
        export default {
            // app code
        }
    </script>

    <!-- allowed -->
    <style>
        :host {}
    </style>
</html>
```

[ci-image]: https://img.shields.io/github/actions/workflow/status/riot/ssr/test.yml?style=flat-square
[ci-url]: https://github.com/riot/ssr/actions
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: http://img.shields.io/npm/v/@riotjs/ssr.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/@riotjs/ssr.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@riotjs/ssr
