import { ColumnsType } from "antd/lib/table";
import { Role } from "./types";

const column: ColumnsType<Role> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '角色',
        dataIndex: 'name',
        key: 'name',
    }
];

export default column