import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { DOMParser } from "prosemirror-model";

import { schema } from "./schema/schema";
import { buildPlugins } from "./plugins/plugins";

import "./styles/prosemirror.css";
import "./styles/marks.css";
import "./styles/nodes.css";
import "./styles/editor-scope.css";

const emptyDoc = schema.nodes.doc.createAndFill();

export const filthy = (node, doc = emptyDoc, onChange = state => {}) => {
  const view = new EditorView(node, {
    state: EditorState.fromJSON(
      {
        schema,
        plugins: buildPlugins()
      },
      { doc, selection: { type: "text", anchor: 1, head: 1 } }
    ),
    dispatchTransaction(tr) {
      this.updateState(this.state.apply(tr));

      if (tr.docChanged) {
        onChange(this.state.doc);
      }
    }
  });
};

window.filthy = filthy;
