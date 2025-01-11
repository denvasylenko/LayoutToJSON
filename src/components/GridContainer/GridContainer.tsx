import React from 'react';

import { Col, Divider, Row } from 'antd';
export interface Props {
  children: React.ReactNode;
  gap: number;
  itemConfig: any
}

export function GridContainer({children, itemConfig, gap}: Props) {
  return (
    <div style={{padding: '25px 0px'}}>
      <Row gutter={[Number(gap), Number(gap)]}>
      {React.Children.map(children, (child) => {
        const span = itemConfig[child.props.id].span

        return <Col span={Number(span)}>{child}</Col>
      })}
      </Row>

    </div>
  );
}
