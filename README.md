# ssr
Riot module to render riot components on the server

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

# Installation

```
npm i -S riot @riotjs/compiler @riotjs/ssr
```

# Usage

### render

You can simply render your components markup as it follows:

```js
import MyComponent from './my-component.riot'
import render from '@riotjs/ssr'

const html = render('my-component', MyComponent, { some: 'initial props' })
```

### fragments

You can also extract the rendered `html` and `css` separately using the `fragments` function:

```js
import MyComponent from './my-component.riot'
import {fragments} from '@riotjs/ssr'

const {html, css} = fragments('my-component', MyComponent, { some: 'initial props' })
```

### register

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

[travis-image]:https://img.shields.io/travis/riot/ssr.svg?style=flat-square
[travis-url]:https://travis-ci.org/riot/ssr

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE

[npm-version-image]:http://img.shields.io/npm/v/@riotjs/ssr.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/@riotjs/ssr.svg?style=flat-square
[npm-url]:https://npmjs.org/package/@riotjs/ssr
