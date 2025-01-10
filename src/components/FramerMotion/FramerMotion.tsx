import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import {Wrapper} from '../Wrapper/Wrapper.tsx';
import {GridContainer} from '../GridContainer/GridContainer.tsx';
import {createRange} from '../utilities/createRange.ts';

import styles from '../Item/Item.module.scss'


export function FramerMotion() {
  const [items, setItems] = useState(() =>
    createRange<UniqueIdentifier>(16, (index) => index + 1)
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Wrapper center>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext strategy={rectSortingStrategy} items={items}>
          <GridContainer columns={5}>
            {items.map((id) => (
              <Item key={id} id={id} renderItem={() => id} />
            ))}
          </GridContainer>
        </SortableContext>
      </DndContext>
    </Wrapper>
  );

  function handleDragEnd({active, over}: DragEndEvent) {
    if (!over) {
      return;
    }

    setItems((items) =>
      arrayMove(items, items.indexOf(active.id), items.indexOf(over.id))
    );
  }
}

const baseStyles: React.CSSProperties = {
  position: 'relative',
  width: 140,
  height: 140,
};

const initialStyles = {
  x: 0,
  y: 0,
  scale: 1,
};

function Item({id, renderItem}: {id: UniqueIdentifier, renderItem: () => any}) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    isDragging,
  } = useSortable({
    id,
    transition: null,
  });

  return (
    <motion.div
      className={styles.Item}
      style={baseStyles}
      ref={setNodeRef}
      layoutId={String(id)}
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
              boxShadow: isDragging
                ? '0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)'
                : undefined,
            }
          : initialStyles
      }
      transition={{
        duration: !isDragging ? 0.25 : 0,
        easings: {
          type: 'spring',
        },
        scale: {
          duration: 0.25,
        },
        zIndex: {
          delay: isDragging ? 0 : 0.25,
        },
      }}
      {...attributes}
      {...listeners}
    >
      {renderItem()}
    </motion.div>
  );
}
