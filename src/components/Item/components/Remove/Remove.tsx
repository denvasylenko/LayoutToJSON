import React from 'react';

import {Action, Props as ActionProps} from '../Action/Action.tsx';
import { DeleteOutlined } from '@ant-design/icons';

export function Remove(props: ActionProps) {
  return (
    <Action
      {...props}
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)',
      }}
    >
      <DeleteOutlined />
    </Action>
  );
}
