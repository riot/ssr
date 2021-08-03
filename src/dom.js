import {parseHTML} from 'linkedom'

export function create() {
  // no need to recreate globals
  if (global.window && global.document && global.Node) {
    return
  }

  const {
    window,
    document,
    Node
  } = parseHTML('<!doctype html><html></html>')

  global.window = window
  global.document = document
  global.Node = Node
}

export function clear() {
  if (!(global.window && global.document && global.Node)) {
    return
  }

  global.window = undefined
  global.document = undefined
  global.Node = undefined
}
