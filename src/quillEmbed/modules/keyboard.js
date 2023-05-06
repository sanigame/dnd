import Quill from 'quill'

const QuillKeyboard = Quill.import('modules/keyboard')

/** handle shift enter for list formats*/
const bindings = {
  linebreak: {
    key: 13,
    shiftKey: true,
    handler: function (range, context) {
      const { format } = context
      if (format.list) {
        this.quill.insertEmbed(range.index, 'custombreak', true, Quill.sources.USER)
        this.quill.setSelection(range.index + 1, Quill.sources.USER)
      } else {
        return true
      }
    },
  },
}

export class Keyboard extends QuillKeyboard {
  constructor(quill, options) {
    super(quill, {
      ...options,
      bindings: {
        ...bindings,
        ...options.bindings,
      },
    })
  }
}
