import { Plugin } from "prosemirror-state";
import { buildInputRules } from "prosemirror-example-setup";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import { history } from "prosemirror-history";
import { menuBar } from "prosemirror-menu";
import {Selection, TextSelection, NodeSelection, AllSelection} from "prosemirror-state"

import { schema } from "../schema/schema";
// import { myMenu } from "./myMenu";
import { buildKeymap } from "./build-keymap";
import { buildMenuItems } from "./build-menu-items";

export function insertSave(state, dispatch) {
  let { $from, $to } = state.selection;
  // if ($from.parent.inlineContent || $to.parent.inlineContent) return false;
  // let type = defaultBlockAt($from.parent.contentMatchAt($to.indexAfter()));
  // if (!type || !type.isTextblock) return false;
  if (dispatch) {
    let side = (!$from.parentOffset && $to.index() < $to.parent.childCount
      ? $from
      : $to
    ).pos;
    let tr = state.tr.insert(side, state.schema.nodes.save.createAndFill());
    tr.setSelection(TextSelection.create(tr.doc, side + 1));
    dispatch(tr.scrollIntoView());
  }


  return true;
}

//     mapKeys:: ?Object
//     Can be used to [adjust](#example-setup.buildKeymap) the key bindings created.
export const buildPlugins = mapKeys => [
  buildInputRules(schema),
  keymap(buildKeymap(schema, mapKeys)),
  keymap(baseKeymap),
  keymap({
    "Mod-s": insertSave
  }),
  dropCursor(),
  gapCursor(),
  // myMenu,
  menuBar({
    // floating: options.floatingMenu !== false,
    content: buildMenuItems(schema).fullMenu,
    floating: true
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
