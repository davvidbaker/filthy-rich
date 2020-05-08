import { baseKeymap } from 'prosemirror-commands'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { menuBar } from 'prosemirror-menu'
import { Plugin } from 'prosemirror-state'

import { schema } from '../schema/schema'
import { buildInputRules } from './build-input-rules'
// import { myMenu } from "./myMenu";
import { buildKeymap } from './build-keymap'
import { buildMenuItems } from './build-menu-items'

//     mapKeys:: ?Object
//     Can be used to [adjust](#example-setup.buildKeymap) the key bindings created.
export const buildPlugins = (mapKeys) => [
  buildInputRules(schema),
  keymap(buildKeymap(schema, mapKeys)),
  keymap(baseKeymap),
  dropCursor(),
  gapCursor(),
  // myMenu,
  menuBar({
    // floating: options.floatingMenu !== false,
    content: buildMenuItems(schema).fullMenu,
    floating: true,
  }),
  history(),
  new Plugin({
    props: {
      attributes: { class: 'ProseMirror-example-setup-style' },
    },
  }),
]

// let plugins = [
//   buildInputRules(options.schema),
//   keymap(buildKeymap(options.schema, options.mapKeys)),
//   keymap(baseKeymap),
//   dropCursor(),
//   gapCursor()
// ]
// exampleSetup({ schema });

// export function exampleSetup(options) {
//   let plugins = }
// }
