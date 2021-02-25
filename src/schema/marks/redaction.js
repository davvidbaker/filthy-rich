export const redaction = {
  inclusive: false,
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
