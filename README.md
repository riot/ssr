# ssr
Riot module to render riot components on the server

# Installation

```
npm i -S @riotjs/ssr
```

# Usage

To render your components in a node environement you will need to register the riot loader hooks first:

```js
const register = require('@riotjs/ssr/register')

// from now on you can load `.riot` tags in node
const unregister = register()

// normally you will not need to call this function but if you want you can unhook the riot loader
unregister()
```

Once the hook will be registered you can render your components tags:

```js
const MyComponent = require('./my-component.riot')
const render = require('@riotjs/ssr')


render('my-component', MyComponent, { some: 'initial props' }) // it will return your component markup
```
