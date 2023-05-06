/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'

import defer from 'lodash/defer'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import Quill from 'quill'

import 'react-quill/dist/quill.snow.css'
import './style.css'

const NoteDetail = ({ noteId }) => {
  let editor = null
  const editorContainer = useRef()
  // const quillRef = useRef()
  // const [value, setValue] = useState('')
  const [embedBlots, setaEmbedBlots] = useState([])

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

  const onMount = (...blots) => {
    const embeds = blots.reduce(
      (memo, blot) => {
        memo[blot.id] = blot
        return memo
      },
      { ...embedBlots },
    )
    setaEmbedBlots(embeds)
  }

  const onUnmount = (unmountedBlot) => {
    const { [unmountedBlot.id]: blot, ...embedBlots } = embedBlots
    setaEmbedBlots(embedBlots)
  }

  useEffect(() => {
    editor = new Quill(editorContainer.current, {
      placeholder: 'Start typing',
      readOnly: false,
      // formats: ['header', 'poll'],
      theme: 'snow',
      modules: modules,
      formats: formats,
    })

    let blots = []
    /** Listener to listen for custom format */
    editor.scroll.emitter.on('blot-mount', (blot) => {
      blots.push(blot)
      defer(() => {
        if (blots.length > 0) {
          onMount(...blots)
          blots = []
        }
      })
    })
    editor.scroll.emitter.on('blot-unmount', onUnmount)

    const delta = {
      ops: [
        {
          insert: '\n',
          attributes: {
            header: 1,
          },
        },
      ],
    }
    editor.setContents(delta)

    return () => {}
  }, [])

  return (
    <div>
      <p>NoteDetail {noteId}</p>
      <div spellCheck={false} ref={editorContainer}>
        {map(embedBlots, (blot) => blot.renderPortal(blot.id))}
      </div>
    </div>
  )
}

NoteDetail.propTypes = {
  noteId: PropTypes.string,
}

export default NoteDetail
