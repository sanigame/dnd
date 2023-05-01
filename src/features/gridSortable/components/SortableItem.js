/* eslint-disable react/prop-types */
import React from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Item from './Item'

const SortableItem = (props) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  const goToDetail = () => {
    console.log('go to id ', props.id)
  }

  return (
    <Item
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...props}
      {...attributes}
      {...listeners}
      onClick={() => goToDetail()}
    />
  )
}

export default SortableItem
