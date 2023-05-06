import Quill from 'quill'

const QuillHeader = Quill.import('formats/header')

export class Header extends QuillHeader {
  static create(value) {
    if (parseInt(value, 10) > 2) {
      return super.create(2)
    }
    let node = super.create(value)
    if (value === 1) node.setAttribute('class', 'h1-class')
    else if (value === 2) node.setAttribute('class', 'h2-class')
    return node
  }
}

Header.tagName = ['H1', 'H2']
