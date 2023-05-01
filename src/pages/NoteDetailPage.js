import React from 'react'

import { useParams } from 'react-router-dom'

import NoteDetail from '../features/noteDetail/NoteDetail'

const NoteDetailPage = () => {
  const { noteId } = useParams()
  return (
    <div>
      <NoteDetail noteId={noteId} />
    </div>
  )
}

export default NoteDetailPage
