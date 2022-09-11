import { Form, Spin } from 'antd';
import Tree, { DataNode, TreeProps } from 'antd/lib/tree';
import React, { FC, SetStateAction, useEffect, useState } from 'react'
import http from '../../../libs/http';
import { RouterTree } from '../../../types'
import './index.less'

const treeData: DataNode[] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        disableCheckbox: true,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
            },
        ],
    },
];

const Item = Form.Item

export default function Permissions() {
    const [form] = Form.useForm()
    const [permissionTree,setPermissionTree] = useState<DataNode[]>([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        http.post('/permission/control').then((res)=>{
            setPermissionTree(formatTree(res.routeTree))
        }).catch(()=>{

        })
    },[])

    const formatTree = (tree:RouterTree[]) => {
        let arr = tree
        changeKey(arr, "route", "key"); 
        changeKey(arr, "name", "title"); 
        return arr as unknown as DataNode[]
    }

    const changeKey = (objAry: RouterTree[] | undefined, key: string, newkey: string) => {
        if (objAry != null) {
          objAry.forEach((item) => {
            Object.assign(item, {
              [newkey]: item[key],
            });
            delete item[key];
            changeKey(item.children, key, newkey);
          });
        }
      }

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    return (
        <div className='sx-permissions'>
            {permissionTree.length ? 
            
            <div className='sx-permissions-tree'>
                <Tree
                checkable
                // defaultExpandedKeys={['0-0-0', '0-0-1']}
                // defaultSelectedKeys={['role-manage']}
                defaultCheckedKeys={['/role-manage/permissions']}
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={permissionTree}
            />
            </div>
            : <div className='sx-permissions-loading'><Spin /></div>}
        </div>

    );
};
