import React from 'react';
import {AnimateLayoutChanges, defaultAnimateLayoutChanges, rectSortingStrategy} from '@dnd-kit/sortable';
import { Item } from './components/Item/Item.tsx';
import {MeasuringStrategy, UniqueIdentifier} from '@dnd-kit/core';
import { Sortable, Props as SortableProps } from './components/Sortable/Sortable.tsx';
import {GridContainer} from './components/GridContainer/GridContainer.tsx';
import { v4 as uuidv4 } from 'uuid';

export const RemovableItems = ({
  id, 
  items, 
  addItems, 
  setItems, 
  setGap, 
  gap, 
  setColumns, 
  columns
}) => {
  const _columns = columns[id]
  const _gap = gap[id]
  const _items = items[id] ?? []
  
  const props: Partial<SortableProps> = {
    adjustScale: true,
    Container: (props: any) => {
      return <GridContainer {...props} columns={_columns} gap={_gap} />
    },
    strategy: rectSortingStrategy,
    wrapperStyle: () => ({
      width: 800,
      height: 140,
    }),
    renderItem: (pr) => {
      return (
        <Item 
          {...pr}
          value={<div><RemovableItems {
            ...{
              id: pr.value, 
              items, 
              addItems, 
              setItems, 
              setGap, 
              gap, 
              setColumns, 
              columns
            }
          }/></div>}
        />
      )
    }
  };
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({...args, wasDragging: true});

 
  
  return (
    <div>
      <button onClick={() => addItems(id)}>Add New</button>
      <input value={_gap} label="set gap" onChange={(event) => setGap(id, event.target.value)}/>
      <input value={_columns} label="set columns" onChange={(event) => setColumns(id, event.target.value)}/>
      <Sortable
        {...props}
        animateLayoutChanges={animateLayoutChanges}
        measuring={{droppable: {strategy: MeasuringStrategy.Always}}}
        removable
        handle
        setItems={setItems(id)}
        items={_items}
      />
    </div>
  );
};

const ROOT_ID = uuidv4()
function App() {
  const [items, setItems] = React.useState<UniqueIdentifier[]>({[ROOT_ID]: []});
  const [gap, setGap] = React.useState({[ROOT_ID]: 10})
  const [columns, setColumns] = React.useState({[ROOT_ID]: 1})

  const addItems = (id) => {
    const newItemId = uuidv4()
    setItems(prev => ({
      ...prev,
      [id]: [...(prev[id] ?? []), newItemId]
    }))
    setGap(prev => ({...prev, [newItemId]: 10}))
    setColumns(prev => ({...prev, [newItemId]: 1}))
  }

  const _setItems = (id) => (items) => {
    // @TODO find difference and remove columns and gaps
    setItems(prev => ({
      ...prev,
      [id]: Array.isArray(items) ? items : items(prev[id])
    })) 
  }

  const _setGap = (id, value) => {
    setGap(prev => ({...prev, [id]: value}))
    
  }

  const _setColumns = (id, value) => {
    setColumns(prev => ({...prev, [id]: value}))
  }

  return <RemovableItems {...{
    id: ROOT_ID, 
    items, 
    addItems, 
    setItems: _setItems, 
    setGap: _setGap, 
    gap, 
    setColumns: _setColumns, 
    columns
  }}/>
}

export default App;
