# ssr
Riot module to render riot components on the server

# Installation

```
npm i -S riot @riotjs/compiler @riotjs/ssr
```

# Usage

You can simply render your components markup as it follows:

```js
import MyComponent from './my-component.riot'
import render from '@riotjs/ssr'

const html = render('my-component', MyComponent, { some: 'initial props' })
```

You can also extract the rendered `html` and `css` separately using the `fragments` function:

```js
import MyComponent from './my-component.riot'
import {fragments} from '@riotjs/ssr'

const {html, css} = fragments('my-component', MyComponent, { some: 'initial props' })
```

If you only want load your components source code in a node environement you just need to register the riot loader hook:

```js
import register from '@riotjs/ssr/register'

import MyComponent from './my-component.riot' // It will fail

// from now on you can load `.riot` tags in node
const unregister = register()

import MyComponent from './my-component.riot' // it works!

// normally you will not need to call this function but if you want you can unhook the riot loader
unregister()
```
