import { DOMSerializer, DOMParser } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { buildPlugins } from './plugins/plugins'
import { schema } from './schema/schema'

import './styles/prosemirror.css'
import './styles/marks.css'
import './styles/nodes.css'
import './styles/editor-scope.css'

const clipboardSerializer = DOMSerializer.fromSchema(schema)
// I wonder if it's bad to mutate in here like this.
// clipboardSerializer.nodes.save = (arg) => {
//   console.log(`🔥  arg`, arg)
//   return 'ƒ-filthy-save'
// }

const clipboardParser = DOMParser.fromSchema(schema)
// clipboardParser.nodes.save = (arg) => {
//   return 'anything'
// }
console.log(`🔥  clipboardParser`, clipboardParser)

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
    // handlePaste(view, event, slice) {
    //   console.log({ view, event, slice })
    //   return true
    // },
    // clipboardSerializer,
    // clipboardParser,
    // // Can be used to transform pasted HTML text, before it is parsed, for example to clean it up.
    // transformPastedHTML(html) {
    //   console.log(`🔥  html`, html)
    //   // return `<span>hello</span>`
    //   return html
    // },
    dispatchTransaction(tr) {
      this.updateState(this.state.apply(tr))

      if (tr.docChanged) {
        onChange(this.state.doc)
      }
      console.log(`🔥  this.state.selection`, this.state.selection.content())
    },
  })
}

window.filthy = filthy
