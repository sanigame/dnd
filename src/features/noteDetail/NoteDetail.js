import React, { useState } from 'react'

import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './style.css'

const NoteDetail = ({ noteId }) => {
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

  return (
    <div>
      <p>NoteDetail {noteId}</p>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
        // onChange={(e) => {
        //   console.log(e)
        //   setValue(e.replace(/\s/g, '&nbsp'))
        // }}
      />
    </div>
  )
}

NoteDetail.propTypes = {
  noteId: PropTypes.string,
}

export default NoteDetail
