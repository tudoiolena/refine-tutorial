import { useForm, Edit } from "@refinedev/antd";

import { Form, Input, InputNumber, Select } from "antd";

export const EditPost = () => {
  const { formProps, saveButtonProps, query } = useForm({
    redirect: "show",
  });

  return (
    <Edit saveButtonProps={saveButtonProps} title="Edit Amplify Product">
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
          <Select
            placeholder="Select category"
            options={[
              { value: "Electronics", label: "Electronics" },
              { value: "Books", label: "Books" },
              { value: "Clothing", label: "Clothing" },
              { value: "Home", label: "Home & Garden" },
              { value: "Sports", label: "Sports" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <InputNumber 
            step="0.01" 
            stringMode 
            placeholder="0.00"
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
}; 