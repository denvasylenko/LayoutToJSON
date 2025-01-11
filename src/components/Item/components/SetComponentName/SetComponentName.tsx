import React from 'react';

import { Action, Props as ActionProps } from '../Action/Action.tsx';
import { ColumnWidthOutlined, FormatPainterOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { COMPONENTS } from '../../../Templates/Templates.tsx';

const items = Object.keys(COMPONENTS).map(itm => ({
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
        <FormatPainterOutlined />
    </Action>
    </Dropdown>
  );
}
