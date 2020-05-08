export default { title: 'Filthy Rich' }

import { doc, freeWrite } from '../fixtures/doc'
import { filthy } from './index'

export const main = () => {
  const div = document.createElement('div')
  filthy(div, doc)

  return div
}

export const free = () => {
  const div = document.createElement('div')
  filthy(div, freeWrite)

  return div
}
