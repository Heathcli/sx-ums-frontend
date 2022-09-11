import { Button, TableColumnsType } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import lodash from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SxTable from '../../../component/SxTable'
import http from '../../../libs/http'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectLoading, setLoading } from '../../../redux/slice/loadingSlice'
import { ExpandedDataType, Role } from './types'
import columns from './columns'
import SubHeader from './component/SubHeader'

export default function RoleList() {
    const [newColumns,setNewColumns] = useState<ColumnsType<Role>>(columns)
    const [roleList, setRoleList] = useState<Role[]>([])
    // const [loading, setLoading] = useState(false)
  
    const { loading } = useAppSelector(selectLoading)
    const dispatch = useAppDispatch()
  
    const navigate = useNavigate()
    useEffect(() => {
      setNewColumns([...columns,renderOperation()])
      getList()
    }, [])
  
    const renderOperation = () => {
      return {
        title:'操作',
        render:(item:Role)=>{
          return <div className='operation'>
             <Button type="link" onClick={()=>navigate(`/user-manage/mod/${item.id}`)}>编辑</Button>
             <Button danger type="link" onClick={()=>{}}>删除</Button>
          </div>
        }
      }
    }

    const expandedRowRender = () => {
        
        const columns1: TableColumnsType<ExpandedDataType> = [
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: '角色', dataIndex: 'name', key: 'name' }
        ];
    
        const data = [];
        for (let i = 0; i < 3; ++i) {
          data.push({
            id:1,
            key: i.toString(),
            date: '2014-12-24 23:12:00',
            name: 'This is production name',
          });
        }
        return <Table columns={columns1} dataSource={data} pagination={false} />;
      };
  
    const getList = () => {
      if(loading) return
      dispatch(setLoading(true))
      http.post('/role/list').then((res) => {
        setRoleList(lodash.get(res, 'roleList', []))
        dispatch(setLoading(false))
      }).catch(() => {
        dispatch(setLoading(false))
      })
    }
    return (
        <div>
            <SubHeader />
            {/* <WhiteSpace height={40} /> */}
            <SxTable
                dataSource={roleList}
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0']}}
                columns={newColumns}
                loading={loading}
            />
        </div>
    )
}
