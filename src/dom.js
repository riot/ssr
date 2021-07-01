import {parseHTML} from 'linkedom'

export function setup() {
  const {
    window,
    document,
    Node
  } = parseHTML('<!doctype html><html></html>')

  global.window = window
  global.document = document
  global.Node = Node
}

export function dispose() {
  if (global.window === undefined) {
    return
  }
  global.window = undefined
  global.document = undefined
  global.Node = undefined
}