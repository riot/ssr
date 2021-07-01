import {parseHTML} from 'linkedom'

const {
  window,
  document,
  Node
} = parseHTML('<!doctype html><html></html>')

global.window = window
global.document = document
global.Node = Node