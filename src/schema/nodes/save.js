export const save = {
  inline: true,
  group: 'inline',
  toDOM() {
    return [
      'span',
      { class: 'filthy-save' },
      // Throwback to apple s for save
      Math.random() > 0.9 ? ' S' : '⌘ S',
    ]
  },
  parseDOM: [
    {
      tag: 'span.filthy-save',
    },
  ],
}
