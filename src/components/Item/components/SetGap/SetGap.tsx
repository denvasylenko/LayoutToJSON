import React from 'react';

import { Action, Props as ActionProps } from '../Action/Action.tsx';
import { ColumnWidthOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

const items = [8, 16, 24, 32].map(itm => ({
  key: itm,
  label: itm,
}))

export function SetGap({ onClick, ...props }: ActionProps) {
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
