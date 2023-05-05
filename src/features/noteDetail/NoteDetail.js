import React, { useState, useRef } from 'react'

import PropTypes from 'prop-types'
import ReactQuill from 'react-quill' // , { Quill }

import 'react-quill/dist/quill.snow.css'
import './style.css'

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
    </div>
  )
}

NoteDetail.propTypes = {
  noteId: PropTypes.string,
}

export default NoteDetail
