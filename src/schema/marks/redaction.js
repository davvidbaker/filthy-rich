import { MarkSpec } from "prosemirror-model";

export const redaction = {
  toDOM: () => [
    "span",
    {
      class: "filthy-redaction"
      // style: "text-decoration:underline;"
    }
  ],
  parseDOM: [
    {
      tag: "span",
      class: "filthy-redaction"
    }
  ]
};
