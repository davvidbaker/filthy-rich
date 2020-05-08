export const redaction = {
  toDOM: () => [
    'span',
    {
      class: 'filthy-redaction',
    },
  ],
  parseDOM: [
    {
      tag: 'span',
      class: 'filthy-redaction',
    },
  ],
}
