/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useState, useRef } from 'react'

import defer from 'lodash/defer'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import Quill from 'quill'

import { Poll, Header } from '../../quillEmbed/formats'
import { Keyboard } from '../../quillEmbed/modules/keyboard'

import 'react-quill/dist/quill.snow.css'
import './style.css'

Quill.register(
  {
    'formats/header': Header,
    'formats/poll': Poll,
    'modules/keyboard': Keyboard,
  },
  true,
)

class NoteDetail extends Component {
  constructor(props) {
    super(props)
    this.editor = null
    this.editorContainer = React.createRef()
    this.state = {
      embedBlots: [],
    }
  }

  componentDidMount() {
    this.editor = new Quill(this.editorContainer.current, {
      placeholder: 'Start typing',
      readOnly: false,
      formats: ['header', 'poll'],
      theme: 'snow',
    })

    let blots = []
    /** Listener to listen for custom format */
    this.editor.scroll.emitter.on('blot-mount', (blot) => {
      blots.push(blot)
      defer(() => {
        if (blots.length > 0) {
          this.onMount(...blots)
          blots = []
        }
      })
    })
    this.editor.scroll.emitter.on('blot-unmount', this.onUnmount)

    const delta = {
      ops: [
        /** Bold Formatting */
        {
          insert: 'Header 1',
        },
        {
          insert: '\n',
          attributes: {
            header: 1,
          },
        },
      ],
    }
    this.editor.setContents(delta)
    this.editor.on('text-change', () => {
      const html = this.editor.root.innerHTML
      console.log('html', html)
    })
  }

  onMount(...blots) {
    const embeds = blots.reduce(
      (memo, blot) => {
        memo[blot.id] = blot
        return memo
      },
      { ...this.state.embedBlots },
    )
    this.setState({ embedBlots: embeds })
  }

  onUnmount(unmountedBlot) {
    console.log('unmountedBlot', unmountedBlot)

    // if (unmountedBlot) {
    //   const { [unmountedBlot.id]: blot, ...embedBlots } = this.state.embedBlots
    //   this.setState({ embedBlots })
    // }
  }

  renderPoll() {
    const range = this.editor.getSelection(true)
    const type = 'poll'
    const data = {}
    /** Call pollFormat */
    this.editor.insertEmbed(range.index, type, data)
    console.log(this.editor.getContents())
  }

  render() {
    return (
      <>
        <div spellCheck={false} ref={this.editorContainer}>
          {map(this.state.embedBlots, (blot) => blot.renderPortal(blot.id))}
        </div>
        <button onClick={() => this.renderPoll()}>Poll</button>
      </>
    )
  }
}

NoteDetail.propTypes = {
  noteId: PropTypes.string,
}

export default NoteDetail
