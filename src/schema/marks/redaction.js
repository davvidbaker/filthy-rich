export const redaction = {
  toDOM: () => [
    'span',
    {
      class: 'filthy-redaction',
    },
  ],
  parseDOM: [
    {
      tag: 'span.filthy-redaction',
    },
  ],
}
