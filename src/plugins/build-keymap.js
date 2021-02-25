import { undo, redo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'

import * as command from './commands'
const mac = typeof navigator != 'undefined' ? /Mac/.test(navigator.platform) : false

// :: (Schema, ?Object) → Object
// Inspect the given schema looking for marks and nodes from the
// basic schema, and if found, add key bindings related to them.
// This will add:
//
// * **Mod-b** for toggling [strong](#schema-basic.StrongMark)
// * **Mod-i** for toggling [emphasis](#schema-basic.EmMark)
// * **Mod-`** for toggling [code font](#schema-basic.CodeMark)
// * **Ctrl-Shift-0** for making the current textblock a paragraph
// * **Ctrl-Shift-1** to **Ctrl-Shift-Digit6** for making the current
//   textblock a heading of the corresponding level
// * **Ctrl-Shift-Backslash** to make the current textblock a code block
// * **Ctrl-Shift-8** to wrap the selection in an ordered list
// * **Ctrl-Shift-9** to wrap the selection in a bullet list
// * **Ctrl->** to wrap the selection in a block quote
// * **Enter** to split a non-empty textblock in a list item while at
//   the same time splitting the list item
// * **Mod-Enter** to insert a hard break
// * **Mod-_** to insert a horizontal rule
// * **Backspace** to undo an input rule
// * **Alt-ArrowUp** to `joinUp`
// * **Alt-ArrowDown** to `joinDown`
// * **Mod-BracketLeft** to `lift`
// * **Escape** to `selectParentNode`
//
// You can suppress or map these bindings by passing a `mapKeys`
// argument, which maps key names (say `"Mod-B"` to either `false`, to
// remove the binding, or a new key name string.
export function buildKeymap(schema, mapKeys) {
  let keys = {},
    type
  function bind(key, cmd) {
    if (mapKeys) {
      let mapped = mapKeys[key]
      if (mapped === false) return
      if (mapped) key = mapped
    }
    keys[key] = cmd
  }

  bind('Mod-z', undo)
  bind('Shift-Mod-z', redo)
  bind('Backspace', undoInputRule)
  if (!mac) bind('Mod-y', redo)

  bind('Alt-ArrowUp', command.joinUp)
  bind('Alt-ArrowDown', command.oinDown)
  bind('Mod-BracketLeft', command.lift)
  bind('Escape', command.selectParentNode)

  if ((type = schema.marks.strong)) {
    bind('Mod-b', command.toggleMark(type))
    bind('Mod-B', command.toggleMark(type))
  }
  if ((type = schema.marks.em)) {
    bind('Mod-i', command.toggleMark(type))
    bind('Mod-I', command.toggleMark(type))
  }
  if ((type = schema.marks.code)) bind('Mod-e', command.toggleMark(type))

  // WORKING OFF THIS, but it's not really what I'm going to want.
  // I think I want a mark with a decoration for editing maybe.
  if ((type = schema.nodes.word_choice)) bind('Shift-Mod-e', command.insertNode(schema.nodes.save))
  // let br = type,
  //   cmd = command.chainCommands(command.exitCode, (state, dispatch) => {
  //     dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView())
  //     return true
  //   })
  // bind('Shift-Enter', cmd)
  // if (mac) bind('Ctrl-Enter', cmd)

  if ((type = schema.nodes.save)) bind('Mod-s', command.insertNode(type))
  if ((type = schema.nodes.bullet_list)) bind('Shift-Ctrl-8', command.wrapInList(type))
  if ((type = schema.nodes.ordered_list)) bind('Shift-Ctrl-9', command.wrapInList(type))
  if ((type = schema.nodes.blockquote)) bind('Ctrl->', command.wrapIn(type))
  if ((type = schema.nodes.hard_break)) {
    let br = type,
      cmd = command.chainCommands(command.exitCode, (state, dispatch) => {
        dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView())
        return true
      })
    bind('Mod-Enter', cmd)
    bind('Shift-Enter', cmd)
    if (mac) bind('Ctrl-Enter', cmd)
  }
  if ((type = schema.nodes.list_item)) {
    bind('Enter', command.splitListItem(type))
    bind('Mod-[', command.liftListItem(type))
    bind('Mod-]', command.sinkListItem(type))
  }
  if ((type = schema.nodes.paragraph)) bind('Shift-Ctrl-0', command.setBlockType(type))
  if ((type = schema.nodes.code_block)) bind('Shift-Ctrl-\\', command.setBlockType(type))
  if ((type = schema.nodes.heading))
    for (let i = 1; i <= 6; i++) bind('Shift-Ctrl-' + i, command.setBlockType(type, { level: i }))
  if ((type = schema.nodes.horizontal_rule)) {
    let hr = type
    bind('Mod-_', (state, dispatch) => {
      dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView())
      return true
    })
  }

  return keys
}
