import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';

import SubFilter from './component/SubFilter'
import SxTable from '../../../component/SxTable'
import SubHeader from './component/SubHeader';

import http from '../../../libs/http';

import { User } from './types';

import columns from './columns';
import './index.less'
import { FilterList } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectLoading, setLoading } from '../../../redux/slice/loadingSlice';



export default function UserList() {

  const [newColumns,setNewColumns] = useState<ColumnsType<User>>(columns)
  const [userList, setUserList] = useState<User[]>([])
  const [gradeList, setGradeList] = useState<FilterList[]>([])
  const [roleList, setRoleList] = useState<FilterList[]>([])
  const [collegeList, setCollegeList] = useState<FilterList[]>([])
  const [positionList, setPositionList] = useState<FilterList[]>([])
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
      render:(item:User)=>{
        return <div className='operation'>
           <Button type="link" onClick={()=>navigate(`/user-manage/mod/${item.studentId}`)}>编辑</Button>
           <Button danger type="link" onClick={()=>{}}>删除</Button>
        </div>
      }
    }
  }

  const getList = () => {
    if(loading) return
    dispatch(setLoading(true))
    http.post('/user/list').then((res) => {
      setUserList(lodash.get(res, 'userList', []))
      setGradeList(lodash.get(res, 'gradeList', []))
      setRoleList(lodash.get(res, 'roleList', []))
      setCollegeList(lodash.get(res, 'collegeList', []))
      setPositionList(lodash.get(res, 'positionList', []))
      dispatch(setLoading(false))
    }).catch(() => {
      dispatch(setLoading(false))
    })
  }
  return (
    <div>
      <SubHeader />
      <SubFilter 
      gradeList={gradeList}
      roleList={roleList}
      collegeList={collegeList}
      positionList={positionList}
      />
      {/* <WhiteSpace height={40} /> */}
      <SxTable
        dataSource={userList}
        columns={newColumns}
        pageSize={20}
        loading={loading}
      />
    </div>
  )
}
