import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'

import { redaction } from './marks/redaction'
import { word_choice } from './marks/word-choice'
import { save } from './nodes/save'
import { time_lapse } from './nodes/time-lapse'

export const schema = new Schema({
  nodes: addListNodes(
    basicSchema.spec.nodes.append({ save, time_lapse /* word_choice: word_choice_node  */ }),
    'paragraph block*',
    'block',
  ),
  marks: basicSchema.spec.marks.append({ redaction, word_choice }),
})
