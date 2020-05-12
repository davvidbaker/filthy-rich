export const time_lapse = {
  content: 'inline*',
  group: 'block',
  toDOM() {
    return ['div', { class: 'filthy-time-lapse' }, 0]
  },
  parseDOM: [
    {
      tag: 'div.filthy-time-lapse',
    },
  ],
}
