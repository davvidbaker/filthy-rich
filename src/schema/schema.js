import { schema as basicSchema } from "prosemirror-schema-basic";
import { Schema } from "prosemirror-model";
import { addListNodes } from "prosemirror-schema-list";

import { redaction } from "./marks/redaction";
import { save } from "./nodes/save";

console.log(`🔥  basicSchema.spec.marks`, basicSchema.spec.marks);

export const schema = new Schema({
  nodes: addListNodes(
    basicSchema.spec.nodes.append({ save }),
    "paragraph block*",
    "block"
  ),
  marks: basicSchema.spec.marks.append({ redaction })
});
