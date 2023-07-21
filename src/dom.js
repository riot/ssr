import { defineProperty } from '@riotjs/util/objects.js'
import { parseHTML } from 'linkedom/worker'

const defineProp = (source, key, value) =>
  defineProperty(source, key, value, {
    writable: true,
    enumerable: true,
  })

const originalWindow = globalThis.window
const originalDocument = globalThis.document
const originalNode = globalThis.Node

export function create() {
  // no need to recreate globals
  if (globalThis.window && globalThis.document && globalThis.Node) {
    return
  }

  const { window, document, Node } = parseHTML('<!doctype html><html></html>')

  defineProp(globalThis, 'window', window)
  defineProp(globalThis, 'document', document)
  defineProp(globalThis, 'Node', Node)
}

export function clear() {
  if (!(globalThis.window && globalThis.document && globalThis.Node)) {
    return
  }

  defineProp(globalThis, 'window', originalWindow)
  defineProp(globalThis, 'document', originalDocument)
  defineProp(globalThis, 'Node', originalNode)
}
