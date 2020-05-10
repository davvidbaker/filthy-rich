import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { buildPlugins } from './plugins/plugins'
import { schema } from './schema/schema'

import './styles/prosemirror.css'
import './styles/marks.css'
import './styles/nodes.css'
import './styles/editor-scope.css'

const emptyDoc = schema.nodes.doc.createAndFill().toJSON()

function getState(doc) {
  try {
    return EditorState.fromJSON(
      {
        schema,
        plugins: buildPlugins(),
      },
      { doc, selection: { type: 'text', anchor: 1, head: 1 } },
    )
  } catch (e) {
    console.warn(
      `Could not get editor state from provided doc instantiating with empty doc
    
    Error: `,
      e,
    )
    return EditorState.fromJSON(
      {
        schema,
        plugins: buildPlugins(),
      },
      { doc: emptyDoc, selection: { type: 'text', anchor: 1, head: 1 } },
    )
  }
}

export function filthy(domNode, doc = emptyDoc, onChange = (_state) => {}) {
  const state = getState(doc)

  return new EditorView(domNode, {
    state,
    dispatchTransaction(tr) {
      this.updateState(this.state.apply(tr))

      if (tr.docChanged) {
        onChange(this.state.doc)
      }
    },
  })
}

window.filthy = filthy
