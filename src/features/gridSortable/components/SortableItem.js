/* eslint-disable react/prop-types */
import React from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useNavigate } from 'react-router-dom'

import Item from './Item'

const SortableItem = (props) => {
  const navigate = useNavigate()
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  const goToDetail = () => {
    navigate('/detail/' + props.id)
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
