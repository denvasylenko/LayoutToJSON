import React from 'react';

import styles from './GridContainer.module.css';

export interface Props {
  children: React.ReactNode;
  columns: number;
  gap: number;
}

export function GridContainer({children, columns, gap}: Props) {
  return (
    <ul
      className={styles.GridContainer}
      style={
        {
          '--col-count': columns,
          '--col-gap': gap + 'px'
        } as React.CSSProperties
      }
    >
      {children}
    </ul>
  );
}
