export {
  wrapIn,
  setBlockType,
  chainCommands,
  toggleMark,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode,
} from 'prosemirror-commands'
import { TextSelection } from 'prosemirror-state'

export { wrapInList, splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list'

export function insertNode(type) {
  return function (state, dispatch) {
    let { $from, $to } = state.selection
    // if ($from.parent.inlineContent || $to.parent.inlineContent) return false;
    // let type = defaultBlockAt($from.parent.contentMatchAt($to.indexAfter()));
    // if (!type || !type.isTextblock) return false;
    if (dispatch) {
      let side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos
      let tr = state.tr.insert(side, state.schema.nodes[type.name].createAndFill())
      tr.setSelection(TextSelection.create(tr.doc, side + 1))
      dispatch(tr.scrollIntoView())
    }

    return true
  }
}
