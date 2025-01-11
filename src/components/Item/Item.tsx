import React, { useEffect } from 'react';
import classNames from 'classnames';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';

import { Handle } from './components/Handle/Handle.tsx';
import { Remove } from './components/Remove/Remove.tsx';

import styles from './Item.module.scss';

import { Add } from './components/Add/Add.tsx';
import { Edit } from './components/Edit/Edit.tsx';
import { SetColumns } from './components/SetColumns/SetColumns.tsx';
import { SetGap } from './components/SetGap/SetGap.tsx';
import { SetComponentName } from './components/SetComponentName/SetComponentName.tsx';
import { FIRST_COMPONENT_ID, ROOT_ID } from '../../App.constants.tsx';
import { SetSpan } from './components/SetSpan/SetSpan.tsx';

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  componentName?: string;
  componentConfigName?: string;
  disabled?: boolean;
  dragging?: boolean;
  isShowContainerOptions?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  isRootComponent?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  onRemove?(): void;
  onAdd?(): void;
  onEdit?(): void;
  setColumns?(): void;
  setSpan?(): void;
  setGap?(): void;
  setComponentName?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props['transform'];
    transition: Props['transition'];
    value: Props['value'];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        onEdit,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        onAdd,
        setColumns,
        setSpan,
        setGap,
        setComponentName,
        componentName,
        isRootComponent,
        isShowContainerOptions,
        componentConfigName,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);


      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          handleProps,
          ref,
          style,
          transform,
          transition,
          value,
          onRemove,
          handle
        })
      ) : (
        <li
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <div className={styles.Actions}>
              {isRootComponent ? (
                <>
                  {setGap ? (
                    <SetGap onClick={setGap} />
                  ) : null}
                  {onAdd ? (
                    <Add onClick={onAdd} />
                  ) : null}
                </>
              ) : (
                <>
                  {onRemove ? (
                    <Remove onClick={onRemove} />
                  ) : null}
                  {setComponentName ? (
                    <SetComponentName onClick={setComponentName} />
                  ) : null}
                  {setColumns ? (
                        <SetColumns onClick={setColumns} />
                      ) : null}
                  {setSpan ? (
                        <SetSpan onClick={setSpan} />
                      ) : null}
                  {isShowContainerOptions ? (
                    <>

                      {setGap ? (
                        <SetGap onClick={setGap} />
                      ) : null}
                    </>
                  ) : null}


                  {onEdit ? <Edit onClick={onEdit} /> : null}
                  {onAdd && isShowContainerOptions ? (
                    <Add onClick={onAdd} />
                  ) : null}
                  {handle ? <Handle {...handleProps} {...listeners} /> : null}
                </>
              )}

            </div>
            <div className={styles.Actions}>
              <div style={{ padding: 10 }}>{componentConfigName} - {componentName}</div>
            </div>
            <div>
              {value}
            </div>
          </div>
        </li>
      );
    }
  )
);
