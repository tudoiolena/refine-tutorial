import { useShow } from "@refinedev/core";
import { TextField, Show } from "@refinedev/antd";

import { Typography, Tag, Descriptions } from "antd";

const { Title } = Typography;

export const ShowUser = () => {
  const {
    query: { data, isLoading },
  } = useShow();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Show isLoading={isLoading} title="User Details">
      <Descriptions bordered column={2}>
        <Descriptions.Item label="ID">
          <TextField value={data?.data?.id} />
        </Descriptions.Item>
        <Descriptions.Item label="Name">
          <TextField value={data?.data?.name} />
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          <TextField value={data?.data?.email} />
        </Descriptions.Item>
        <Descriptions.Item label="Phone" span={2}>
          <TextField value={data?.data?.phone} />
        </Descriptions.Item>
        <Descriptions.Item label="Website" span={2}>
          <TextField value={data?.data?.website} />
        </Descriptions.Item>
        <Descriptions.Item label="Company" span={2}>
          <Tag color="green">{data?.data?.company}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}; 