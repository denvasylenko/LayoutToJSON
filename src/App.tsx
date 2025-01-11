import React from 'react';
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, rectSortingStrategy } from '@dnd-kit/sortable';
import { Item } from './components/Item/Item.tsx';
import { MeasuringStrategy, UniqueIdentifier } from '@dnd-kit/core';
import { Sortable, Props as SortableProps } from './components/Sortable/Sortable.tsx';
import { GridContainer } from './components/GridContainer/GridContainer.tsx';
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Drawer, Form, Input, Row } from 'antd';
import EditDrawer from './components/EditDrawer/EditDrawer.tsx';
import { FIRST_COMPONENT_ID, ROOT_ID } from './App.constants.tsx';
import { Tabs } from 'antd';
import ReactJsonView from '@microlink/react-json-view'

export const RemovableItems = ({
  id,
  items,
  addItems,
  setItems,
  setGap,
  setColumns,
  setSpan,
  onEdit,
  setComponentName,
  itemConfig
}) => {
  const _gap = itemConfig[id]?.gap ?? 8
  const _items = items[id] ?? []

  const props: Partial<SortableProps> = {
    adjustScale: true,
    Container: (pr: any) => {

      return <GridContainer {...pr} itemConfig={itemConfig} gap={_gap} />
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
          onEdit={() => onEdit(pr.value, itemConfig[pr.value].componentName)}
          onAdd={() => addItems(pr.value)}
          setColumns={(value) => setColumns(pr.value, value)}
          setSpan={(value) => setSpan(pr.value, value)}
          setGap={(value) => setGap(pr.value, value)}
          setComponentName={(value) => setComponentName(pr.value, value)}
          componentName={itemConfig[pr.value].componentName}
          componentConfigName={itemConfig[pr.value].name}
          isRootComponent={FIRST_COMPONENT_ID == pr.value}
          isShowContainerOptions={itemConfig[pr.value].componentName == 'Container'}
          value={(
            <div>
              <RemovableItems {...{
                id: pr.value,
                items,
                addItems,
                setItems,
                setGap,
                setColumns,
                setSpan,
                onEdit,
                setComponentName,
                itemConfig
              }} />
            </div>
          )}
        />
      )
    }
  };
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });



  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
      setItems={setItems(id)}
      items={_items}
    />
  );
};

function App() {
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false);

  const [items, setItems] = React.useState<UniqueIdentifier[]>({ [ROOT_ID]: [FIRST_COMPONENT_ID] });
  const [itemConfig, setItemConfig] = React.useState({
    [FIRST_COMPONENT_ID]: {
      name: 'Root',
      gap: 32,
      span: 24,
      componentName: 'Container'
    }
  })

  const [editableComponent, setEditableComponent] = React.useState(undefined)

  const areAllElementsSpanEqual = (arr) => {
    return new Set(arr).size <= 1;
  };

  const addItems = (id) => {
    const newItemId = uuidv4()
    setItems(prev => {

      // Before adding a new item, check if the neighboring items in the same container have the same span.
      const itemsInContainer = prev[id]
      const itemsInContainerConfig = itemsInContainer?.map(_id => itemConfig[_id]) ?? []
      const itemsInContainerSpan = itemsInContainerConfig.map(itm => itm.span)
      const span = itemsInContainerSpan.length && areAllElementsSpanEqual(itemsInContainerSpan) ? itemsInContainerSpan[0] : 24
      setItemConfig(prev => ({ ...prev, [newItemId]: { 
        name: newItemId,
        gap: 32,
        span,
        componentName: 'Container'
      }}))

      return {
        ...prev,
        [id]: [...(prev[id] ?? []), newItemId]
      }
    })

    
  }

  const _setItems = (id) => (items) => {
    // @TODO find difference and remove columns and gaps
    setItems(prev => {
      const newStateIds = {
        ...prev,
        [id]: Array.isArray(items) ? items : items(prev[id])
      }
      
      return newStateIds
    })
  }

  const setGap = (id, gap) => {
    setItemConfig(prev => ({ ...prev, [id]: { ...prev[id],gap }}))

  }

  const setColumns = (id, span) => {

    setItemConfig(prev => ({ 
      ...prev, 
      ...items[id].reduce((acc, itemId) => ({...acc, [itemId]: {...prev[itemId], span}}), {}) 
    }))
  }

  const setSpan = (id, span) => {
    setItemConfig(prev => ({ ...prev, [id]: {...prev[id], span} }))
  }


  const setComponentName = (id, componentName) => {
    setItemConfig(prev => ({ ...prev, [id]: {...prev[id], componentName} }))
  }


  const onEdit = (id, value) => {
    showDrawer()
    setEditableComponent({ id, value })
    form.setFieldsValue(itemConfig[id]);
  }

  // Function to open the drawer
  const showDrawer = () => {
    setVisible(true);

  };

  // Function to close the drawer
  const closeDrawer = () => {
    setVisible(false);
    setEditableComponent(undefined)
    form.resetFields()
  };


  // Function to handle form submission
  const onFinish = (values) => {
    setItemConfig((prev) => ({
      ...prev,
      [editableComponent.id]: {
        ...prev[editableComponent.id],
        ...values
      }
    }))
  };

  const buildUIScema = (type, scope, ids) => {
    if (!ids) {
      return {
        type, scope
      }
    }

    const elements = ids.map(id => buildUIScema(
      itemConfig[id].componentName, 
      itemConfig[id].name,
      items[id]
    ))

    return {
      type,
      scope,
      elements,
    };
  };

  const buildComponentPropsScema = () => {
    
    return Object
      .values(itemConfig)
      .reduce((acc: any, value: any) => {
        if (value.name === 'Root') return acc
        const {name, componentName, ...val} = value
        return {...acc, [name]: val}
      }, {})
  };
  
  return (
    <>
      <EditDrawer {...{ visible, form, onFinish, closeDrawer, editableComponent }} />
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            key: '1',
            label: 'Constructor',
            children: (
              <RemovableItems {...{
                id: ROOT_ID,
                items,
                addItems,
                setItems: _setItems,
                setGap,
                setColumns,
                setSpan,
                onEdit,
                setComponentName,
                itemConfig
              }} />
            ),
          },
          {
            key: '3',
            label: 'Preview',
            children: 'Preview',
          },
          {
            key: '2',
            label: 'UI DOM Schema',
            children: (
              <ReactJsonView src={buildUIScema('ROOT','ROOT', items[ROOT_ID])} />
            ),
          },
          {
            key: '4',
            label: 'Component Props Schema',
            children: (
              <ReactJsonView src={buildComponentPropsScema()} />
            ),
          },
          
        ]}
      />

    </>
  )
}

export default App;
