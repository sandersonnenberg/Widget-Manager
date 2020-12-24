import "antd/dist/antd.css";
import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Space } from 'antd';
import "./styles.css";
import uuid from 'react-uuid';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function AddorEditWidgetComponent({
  keyVal,
  handleAddEditWidget,
  handleCancel
}) {

  //on save
  const onFinish = (values) => {
    let id = uuid();
    let response = values;
    response.id = id;
    if (!response.data)
      response.data = keyVal;
    handleAddEditWidget(response);
    handleCancel();
  };

  //handle save failed
  const onFinishFailed = (errorInfo) => {

    console.log('Failed:', errorInfo);
  };

  return (
    <div className="add-or-edit-component">
      <Form

        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className="row"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your widget name!',
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          className="row"
          name="magicNumber"
          rules={[
            {
              required: true,
              message: 'Please input your magic number!',
            },
          ]}
        >
          <Input type="number" placeholder="Magic Number" />
        </Form.Item>

        <Form.List name="data">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...field}
                    name={[field.key, 'key']}
                    fieldKey={[field.key, 'key']}
                    rules={[{ required: true, message: 'Missing key' }]}
                  >
                    <Input placeholder="Key" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'value']}
                    fieldKey={[field.fieldKey, 'value']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
              </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button className="submit" type="primary" htmlType="submit">
            Save
        </Button>
        </Form.Item>

      </Form>

    </div>);

}

AddorEditWidgetComponent.propTypes = {
  keyVal: PropTypes.array.isRequired,
  handleAddEditWidget: PropTypes.func.isRequired,
  handleCancel:PropTypes.func.isRequired
};