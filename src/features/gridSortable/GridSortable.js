import React, { useState, useCallback } from 'react'

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import Grid from '@mui/material/Grid'

// import Grid from './components/Grid'
import Item from './components/Item'
import SortableItem from './components/SortableItem'

const GridSortable = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => (i + 1).toString()))
  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor),
  )

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id)
  }, [])

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {/* <Grid columns={5}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </Grid> */}
        <Grid container spacing={2}>
          {items.map((id) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={id} id={id}>
              <SortableItem key={id} id={id} />
            </Grid>
          ))}
        </Grid>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
        {activeId ? <Item id={activeId} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default GridSortable
