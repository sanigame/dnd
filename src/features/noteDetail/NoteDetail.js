import React, { useState, useRef } from 'react'

import PropTypes from 'prop-types'
import ReactQuill, { Quill } from 'react-quill' // , { Quill }

import 'react-quill/dist/quill.snow.css'
import './style.css'
const Inline = Quill.import('blots/inline')

// let Inline = Quill.import('blots/inline')
// class BoldBlot extends Inline {}
// BoldBlot.blotName = 'bold'
// BoldBlot.tagName = 'h1'
// Quill.register('formats/bold', BoldBlot)

const NoteDetail = ({ noteId }) => {
  const quillRef = useRef()
  const [value, setValue] = useState('')
  const modules = {
    toolbar: [
      // [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      ['link', 'image'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  const insertText = () => {
    var range = quillRef.current.editor.getSelection()
    let position = range ? range.index : 0
    quillRef.current.editor.insertText(position, 'Hello, World! ')
  }

  const insertHtml = () => {
    const quill = quillRef.current.editor
    const value = `<button>New content here</button>`
    const delta = quill.clipboard.convert(value)

    quill.setContents(delta, 'silent')
  }

  const createElementWithClassName = () => {
    class SpanBlock extends Inline {
      static create() {
        let node = super.create()
        node.setAttribute('class', 'spanblock')
        node.setAttribute('id', 'myId')

        return node
      }
    }
    SpanBlock.blotName = 'spanblock'
    SpanBlock.tagName = 'div'
    Quill.register(SpanBlock)

    const div = document.createElement('div')
    var quill = new Quill(div)

    quill.setContents([
      {
        insert: 'hello',
        attributes: {
          spanblock: true,
        },
      },
    ])

    const result = quill.root.innerHTML
    console.log(result)
    return result
  }

  const buttonClick = () => {
    const quill = quillRef.current.getEditor()
    const oldHtml = quill.root.innerHTML
    const newElement = createElementWithClassName()
    const newHtml = oldHtml + newElement

    setValue(newHtml)
  }

  return (
    <div>
      <p>NoteDetail {noteId}</p>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
        ref={quillRef}
        // onChange={(e) => {
        //   console.log(e)
        //   setValue(e.replace(/\s/g, '&nbsp'))
        // }}
      />
      <button onClick={() => insertText()}>Insert Text</button>
      <button onClick={() => insertHtml()}>Insert HTML</button>
      <button onClick={() => buttonClick()}>click me</button>
    </div>
  )
}

NoteDetail.propTypes = {
  noteId: PropTypes.string,
}

export default NoteDetail
