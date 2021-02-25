import {
  inputRules,
  InputRule,
  wrappingInputRule,
  textblockTypeInputRule,
  smartQuotes,
  emDash,
  ellipsis,
} from 'prosemirror-inputrules'

// : (NodeType) → InputRule
// Given a blockquote node type, returns an input rule that turns `"> "`
// at the start of a textblock into a blockquote.
export function blockQuoteRule(nodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType)
}

// : (NodeType) → InputRule
// Given a list node type, returns an input rule that turns a number
// followed by a dot at the start of a textblock into an ordered list.
export function orderedListRule(nodeType) {
  return wrappingInputRule(
    /^(\d+)\.\s$/,
    nodeType,
    (match) => ({ order: +match[1] }),
    (match, node) => node.childCount + node.attrs.order == +match[1],
  )
}

// : (NodeType) → InputRule
// Given a list node type, returns an input rule that turns a bullet
// (dash, plush, or asterisk) at the start of a textblock into a
// bullet list.
export function bulletListRule(nodeType) {
  return wrappingInputRule(/^\s*([-+*])\s$/, nodeType)
}

// : (NodeType) → InputRule
// Given a code block node type, returns an input rule that turns a
// textblock starting with three backticks into a code block.
export function codeBlockRule(nodeType) {
  return textblockTypeInputRule(/^```$/, nodeType)
}

// : (NodeType) → InputRule
export function timeLapseRule(nodeType) {
  return textblockTypeInputRule(/^(\.\.\.|…)$/, nodeType)
}

// export function textblockTypeInputRule(regexp, nodeType, getAttrs) {
//   return new InputRule(regexp, (state, match, start, end) => {
//     let $start = state.doc.resolve(start)
//     let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs
//     if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) return null
//     return state.tr
//       .delete(start, end)
//       .setBlockType(start, start, nodeType, attrs)
//   })
// }

export function trailingInputRule(regex, markType) {
  return new InputRule(regex, (state, match, start, end) => {
    console.log(`🔥  match`, match)

    const { word, alts } = match.groups

    const alternateWords = alts ? alts.split(/\s/) : []

    const wordChoiceMark = markType.create({ alts: alternateWords })
    console.log(`🔥  wordChoiceMark`, wordChoiceMark)

    return state.tr.delete(start, end).insert(start, markType.schema.text(word, [wordChoiceMark]))
    // I wonder if this is a bad idea (using markType.instance)
    return state.tr.addStoredMark(markType.instance)
    return false
  })
}
// : (MarkType) → InputRule
export function wordChoiceRule(markType) {
  // return textblockTypeInputRule(/\w*(\(\?\))$/, markType)
  // I wonder how bad for performance this is—having to regex a whole long string, not just from the start
  const ret = trailingInputRule(/(?<word>\w*)\(\?(?<alts>.*)?\)/, markType)

  console.log(`🔥  ret`, ret)
  return ret
}

// : (NodeType, number) → InputRule
// Given a node type and a maximum level, creates an input rule that
// turns up to that number of `#` characters followed by a space at
// the start of a textblock into a heading whose level corresponds to
// the number of `#` signs.
export function headingRule(nodeType, maxLevel) {
  return textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, (match) => ({
    level: match[1].length,
  }))
}

// : (Schema) → Plugin
// A set of input rules for creating the basic block quotes, lists,
// code blocks, and heading.
export function buildInputRules(schema) {
  let rules = smartQuotes.concat(emDash),
    type
  if ((type = schema.nodes.blockquote)) rules.push(blockQuoteRule(type))
  if ((type = schema.nodes.ordered_list)) rules.push(orderedListRule(type))
  if ((type = schema.nodes.bullet_list)) rules.push(bulletListRule(type))
  if ((type = schema.nodes.code_block)) rules.push(codeBlockRule(type))
  if ((type = schema.nodes.heading)) rules.push(headingRule(type, 6))

  // ellipsis must come after the time lapse rule
  if ((type = schema.nodes.time_lapse)) rules.push(timeLapseRule(type))
  rules.push(ellipsis)

  if ((type = schema.marks.word_choice)) {
    console.log(`✅  typdde`, type)
    // rules.push(wordChoiceRule(type))
    rules.push(wordChoiceRule(type))
  }

  return inputRules({ rules })
}
