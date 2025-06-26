import { useShow } from "@refinedev/core";
import { TextField, NumberField, MarkdownField, Show } from "@refinedev/antd";

import { Typography, Tag, Descriptions } from "antd";

const { Title } = Typography;

export const ShowPost = () => {
  const {
    query: { data, isLoading },
  } = useShow();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Show isLoading={isLoading} title="Amplify Product Details">
      <Descriptions bordered column={2}>
        <Descriptions.Item label="ID">
          <TextField value={data?.data?.id} />
        </Descriptions.Item>
        <Descriptions.Item label="Name">
          <TextField value={data?.data?.name} />
        </Descriptions.Item>
        <Descriptions.Item label="Category" span={2}>
          <Tag color="blue">{data?.data?.category}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Price" span={2}>
          <NumberField 
            value={data?.data?.price} 
            options={{ 
              style: 'currency', 
              currency: 'USD' 
            }} 
          />
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          <MarkdownField value={data?.data?.description} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={new Date(data?.data?.createdAt).toLocaleString()} />
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          <TextField value={new Date(data?.data?.updatedAt).toLocaleString()} />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}; 