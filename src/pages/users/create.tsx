import { useForm, Create } from "@refinedev/antd";

import { Form, Input } from "antd";

export const CreateUser = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });

  return (
    <Create saveButtonProps={saveButtonProps} title="Create User">
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter user name" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Enter email address" />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item label="Website" name="website" rules={[{ type: "url" }]}>
          <Input placeholder="Enter website URL" />
        </Form.Item>
        <Form.Item label="Company" name="company">
          <Input placeholder="Enter company name" />
        </Form.Item>
      </Form>
    </Create>
  );
}; 