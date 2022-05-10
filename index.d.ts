import { RiotComponentWrapper } from 'riot'

export interface RenderingFragments {
  html: string
  css: string
}

export interface domGlobals {
  create: () => void
  clear: () => void
}

export const asyncRenderTimeout: number

export function renderAsync<Props extends unknown> (componentName: string, componentShell: RiotComponentWrapper<Props>, props?: Props): Promise<string>
export function renderAsyncFragments<Props extends unknown> (componentName: string, componentShell: RiotComponentWrapper<Props>, props?: Props): Promise<RenderingFragments>
export function fragments<Props extends unknown> (componentName: string, componentShell: RiotComponentWrapper<Props>, props?: Props): RenderingFragments
export function render<Props extends unknown> (componentName: string, componentShell: RiotComponentWrapper<Props>, props?: Props): string

export default render