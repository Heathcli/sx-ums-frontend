import { ColumnsType } from "antd/lib/table";
import { IUser } from "./types";

const column: ColumnsType<IUser> = [
    {
        title: '学号',
        dataIndex: 'studentId',
        key: 'studentId',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        sorter: (a, b) => a.grade - b.grade,
    },
    {
        title: '学院',
        dataIndex: 'college',
        key: 'college',
    },
    {
        title: '专业班级',
        dataIndex: 'professionalClass',
        key: 'professionalClass',
    },
    {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: '职能',
        dataIndex: 'position',
        key: 'position',
    },
];

export default column