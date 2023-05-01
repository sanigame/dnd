import React, { useState } from 'react'

import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const NoteDetail = ({ noteId }) => {
  const [value, setValue] = useState('')

  return (
    <div>
      <p>NoteDetail {noteId}</p>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

NoteDetail.propTypes = {
  noteId: PropTypes.string,
}

export default NoteDetail
