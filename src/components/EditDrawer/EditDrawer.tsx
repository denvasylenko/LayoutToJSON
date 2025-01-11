import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Row, Col, Checkbox } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Action } from '../Item/components/Action/Action.tsx';
import { COMPONENTS } from '../Templates/Templates.tsx';
import PropTypes from "prop-types";
import TextArea from 'antd/es/input/TextArea';

const EditDrawer = ({ visible,form, onFinish, closeDrawer, editableComponent }) => {




  if (!editableComponent) return null

  const propsMeta = COMPONENTS[editableComponent.value].propsMeta
  console.log('propTypes :', propsMeta)
  const components: any = []

  Object.entries(propsMeta).forEach((v) => {
    const [key, value] = v as any

    if (value.type === "string") {
      components.push(
        // @ts-ignore
        <Form.Item name={key} key={key} label={key}>
          <Input placeholder={`Enter ${key}`} />
        </Form.Item>
      );
    } else if (value.type === "bool") {
      components.push(
        // @ts-ignore
        <Form.Item name={key} key={key} valuePropName="checked">
          <Checkbox>{key}</Checkbox>
        </Form.Item>
      );
    } else if (value.type === "object") {
      components.push(
        // @ts-ignore
        <Form.Item name={key} key={key} label={key}>
          <TextArea
            rows={4}
            placeholder={`Enter JSON for ${key}`}
            defaultValue={`${value.defaultValue}`}
          />
        </Form.Item>
      );
    }
  });

  return (
    <div>
      {/* Drawer */}
      <Drawer
        title={`Edit Information for ${editableComponent.value}`}
        placement="left" // Drawer opens from the left
        onClose={closeDrawer}
        open={visible}
      // width={300} // Optional: Adjust width of the drawer
      >
        {/* Form inside the Drawer */}
        <Form 
          layout="vertical"
          form={form}
          onFinish={onFinish}
          >
          <Col>
            <Form.Item name="name" label="component name">
              <Input placeholder={`Config Name`} />
            </Form.Item>
          </Col>
          <Row gutter={[16, 16]}>
            {components.map((component, index) => (
              <Col key={index} span={24}>
                {component}
              </Col>
            ))}
            <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            </Col>
          </Row>
          
        </Form>
      </Drawer>
    </div>
  );
};

export default EditDrawer;
