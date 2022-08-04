import { ColumnsType } from "antd/lib/table";
import { UserListType } from "./types";

const column: ColumnsType<UserListType> = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
];

export default column