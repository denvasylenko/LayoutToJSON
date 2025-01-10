import React from 'react';
import {AnimateLayoutChanges, defaultAnimateLayoutChanges, rectSortingStrategy} from '@dnd-kit/sortable';
import { Item } from './components/Item/Item.tsx';
import {MeasuringStrategy} from '@dnd-kit/core';
import { Sortable, Props as SortableProps } from './components/Sortable/Sortable.tsx';
import {GridContainer} from './components/GridContainer/GridContainer.tsx';


export const RemovableItems = () => {
  const props: Partial<SortableProps> = {
    adjustScale: true,
    Container: (props: any) => {
      return <GridContainer {...props} columns={5} />
    },
    strategy: rectSortingStrategy,
    wrapperStyle: () => ({
      width: 140,
      height: 140,
    }),
  };
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({...args, wasDragging: true});

  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{droppable: {strategy: MeasuringStrategy.Always}}}
      removable
      handle
    />
  );
};

function App() {
  
  const props: Partial<SortableProps> = {
    adjustScale: true,
    Container: (props: any) => {
      return <GridContainer {...props} columns={1} />
    },
    strategy: rectSortingStrategy,
    wrapperStyle: () => ({
      width: 1000,
      height: 140,
    }),
    renderItem: (pr) => {

      return (
        <Item 
          {...pr} 
          value={
            <RemovableItems/>
          }
        />
      )
    }
  };
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({...args, wasDragging: true});

  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{droppable: {strategy: MeasuringStrategy.Always}}}
      removable
      handle
    />
  );
}

export default App;
