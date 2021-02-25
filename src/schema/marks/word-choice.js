export const word_choice = {
  attrs: {
    alts: {
      default: [],
    },
  },
  toDOM(node) {
    const dataAlts = node.attrs.alts
    console.log(`🔥  dataAlts`, dataAlts, dataAlts.length)
    return [
      'span',
      {
        class: `filthy-word-choice ${
          dataAlts.length === 0 ? 'filthy-word-choice-empty' : 'filthy-word-choice-filled'
        }`,
        'data-alt-1': dataAlts[0],
        'data-alt-2': dataAlts[1],
      },
    ]
  },
  parseDOM: [
    {
      tag: 'span.filthy-word-choice',
      getAttrs(dom) {
        console.log(`🔥  dom`, dom)
        const alts = [dom.getAttribute('data-alt-1'), dom.getAttribute('data-alt-2')].filter(
          Boolean,
        )
        return { alts }
      },
    },
  ],
}
