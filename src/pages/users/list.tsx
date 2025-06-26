import { getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  List,
} from "@refinedev/antd";

import { Table, Space, Input, Tag } from "antd";

export const ListUsers = () => {
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  return (
     <List title="Users">
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="email"
          title="Email"
          render={(value) => (
            <a href={`mailto:${value}`}>{value}</a>
          )}
        />
        <Table.Column
          dataIndex="phone"
          title="Phone"
          render={(value) => (
            <a href={`tel:${value}`}>{value}</a>
          )}
        />
        <Table.Column
          dataIndex="company"
          title="Company"
          render={(value) => (
            <Tag color="green">{value}</Tag>
          )}
        />
        <Table.Column
          dataIndex="website"
          title="Website"
          render={(value) => (
            <a href={value} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          )}
        />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
