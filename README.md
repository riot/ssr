# ssr
Riot module to render riot components on the server

# Installation

```
npm i -S riot @riotjs/compiler @riotjs/ssr
```

# Usage

To render your components in a node environement you will need to register the riot loader hooks first:

```js
import register from '@riotjs/ssr/register'

// from now on you can load `.riot` tags in node
const unregister = register()

// normally you will not need to call this function but if you want you can unhook the riot loader
unregister()
```

Once the hook will be registered you can render your components tags:

```js
import MyComponent from './my-component.riot'
import render from '@riotjs/ssr'

const html = render('my-component', MyComponent, { some: 'initial props' })
```

You can extract also the rendered `html` and `css` separately using the `fragments` function

```js
import MyComponent from './my-component.riot'
import {fragments} from '@riotjs/ssr'

const {html, css} = fragments('my-component', MyComponent, { some: 'initial props' })
```
