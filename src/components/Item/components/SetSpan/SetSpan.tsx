import React from 'react';

import { Action, Props as ActionProps } from '../Action/Action.tsx';
import { HolderOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';


const items = Array.from({ length: 24 }, (_, i) => i + 1).map(itm => ({
  key: itm,
  label: itm,
}))


export function SetSpan({ onClick, ...props }: ActionProps) {
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
      
      <SwapOutlined />
      
    </Action>
    </Dropdown>
  );
}
