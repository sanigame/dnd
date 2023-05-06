/** pollFormat.js */
import React from 'react'

import Quill from 'quill'
import { createPortal } from 'react-dom'
import { v4 } from 'uuid'

import MediaCard from './MediaCard'

const BlockEmbed = Quill.import('blots/block/embed')

export class Poll extends BlockEmbed {
  static create(value) {
    const id = v4()
    let node = super.create(value)
    const refs = Poll.refs
    node.setAttribute('data-id', id)
    Poll.data = value
    Poll.refs = {
      ...refs,
      [id]: React.createRef(),
    }
    return node
  }

  static value(domNode) {
    const id = domNode.getAttribute('data-id')
    const ref = Poll.refs[id]
    return ref && ref.current && ref.current.getData()
  }

  constructor(domNode) {
    super(domNode)
    this.id = domNode.getAttribute('data-id')
    this.data = Poll.data
  }

  attach() {
    super.attach()
    this.scroll.emitter.emit('blot-mount', this)
  }

  renderPortal(id) {
    const { options } = Quill.find(this.scroll.domNode.parentNode)
    const ref = Poll.refs[id]
    return createPortal(
      <PollComponent type={Poll.blotName} node={this.data} ref={ref} readOnly={options.readOnly} />,
      this.domNode,
    )
  }

  detach() {
    super.detach()
    this.scroll.emitter.emit('blot-unmount', this)
  }
}

Poll.blotName = 'poll'
Poll.tagName = 'div'
Poll.className = 'ql-custom'
Poll.raf = {}

class PollComponent extends React.Component {
  getData() {
    return 'data'
  }

  render() {
    return (
      <div>
        <MediaCard />
      </div>
    )
  }
}
