import React from 'react';

import { Action, Props as ActionProps } from '../Action/Action.tsx';
import { ColumnWidthOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

const items = [10, 20, 30, 40, 50].map(itm => ({
  key: itm,
  label: itm,
}))

export function SetComponentName({ onClick, ...props }: ActionProps) {
  return (
    <Dropdown menu={{
      items,
      onClick: ({ key }) => {
        onClick(key)
      }
    }}
      placement="bottomLeft"
    >
    <Action
      {...props}
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)',
      }}
    >
        <ColumnWidthOutlined />
    </Action>
    </Dropdown>
  );
}
