import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { DOMParser } from "prosemirror-model";

import { schema } from "./schema/schema";
import { buildPlugins } from "./plugins/plugins";

import "./styles/prosemirror.css";
import "./styles/marks.css";

const emptyDoc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: []
    }
  ]
};

export const filthy = (node, doc = emptyDoc) => {
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

      console.log(JSON.stringify(view.state.doc.toJSON()));
    }
  });
};
