import { Plugin } from "prosemirror-state";
import { buildInputRules } from "prosemirror-example-setup";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import { history } from "prosemirror-history";
import { menuBar } from "prosemirror-menu";

import { schema } from "../schema/schema";
import { buildKeymap } from "./build-keymap";
import { buildMenuItems } from "./build-menu-items";

//     mapKeys:: ?Object
//     Can be used to [adjust](#example-setup.buildKeymap) the key bindings created.
export const buildPlugins = mapKeys => [
  buildInputRules(schema),
  keymap(buildKeymap(schema, mapKeys)),
  keymap(baseKeymap),
  dropCursor(),
  gapCursor(),
  menuBar({
    // floating: options.floatingMenu !== false,
    content: buildMenuItems(schema).fullMenu
  }),
  history(),
  new Plugin({
    props: {
      attributes: { class: "ProseMirror-example-setup-style" }
    }
  })
];

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
