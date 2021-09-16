import {parseHTML} from 'linkedom'

const defaultCreate = () => {
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
const defaultClear = () => {
  if (!(global.window && global.document && global.Node)) {
    return
  }
  
  global.window = undefined
  global.document = undefined
  global.Node = undefined
}
const configuration = {
  create: null,
  clear: null
}

export function create() {
  if (configuration.create !== null) {
    configuration.create()
    return
  }

  defaultCreate()
}

export function clear() {
  if (configuration.clear !== null) {
    configuration.clear()
    return
  }

  defaultClear()
}

export function configure({
  create, clear
}) {
  if (typeof create !== 'function') {
    throw new Error('`create` must be a function')
  }
  if (typeof clear !== 'function') {
    throw new Error('`clear` must be a function')
  }

  configuration.create = create
  configuration.clear = clear
}
