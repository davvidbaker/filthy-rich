import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { buildPlugins } from './plugins/plugins'
import { schema } from './schema/schema'

import './styles/prosemirror.css'
import './styles/marks.css'
import './styles/nodes.css'
import './styles/editor-scope.css'

const emptyDoc = schema.nodes.doc.createAndFill().toJSON()

export function filthy(node, doc = emptyDoc, onChange = (_state) => {}) {
  return new EditorView(node, {
    state: EditorState.fromJSON(
      {
        schema,
        plugins: buildPlugins(),
      },
      { doc, selection: { type: 'text', anchor: 1, head: 1 } },
    ),
    dispatchTransaction(tr) {
      this.updateState(this.state.apply(tr))

      if (tr.docChanged) {
        onChange(this.state.doc)
      }
    },
  })
}

window.filthy = filthy
