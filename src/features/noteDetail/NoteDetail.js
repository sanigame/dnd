import React from 'react'

import PropTypes from 'prop-types'

const NoteDetail = ({ noteId }) => {
  return <div>NoteDetail {noteId}</div>
}

NoteDetail.propTypes = {
  noteId: PropTypes.number,
}

export default NoteDetail
