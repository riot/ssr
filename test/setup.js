import { pathToFileURL } from 'node:url'
import { register } from 'node:module'

register('@riotjs/register', pathToFileURL('./'))
