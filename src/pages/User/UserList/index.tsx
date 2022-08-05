import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';

import SubFilter from './component/SubFilter'
import SxTable from '../../../component/SxTable'
import SubHeader from './component/SubHeader';

import http from '../../../libs/http';

import { IUser } from './types';

import columns from './columns';
import './index.less'



export default function UserList() {
  const defalutUserList = [
    {
      studentId:201910428215,
      name:'string',
      grade:2019,
      gradeId:2019,
      college:'电子信息与电气工程学院',
      collegeId:1,
      professionalClass:'通信2班',
      role:'软件',
      roleId:4,
      position:'方向组长',
      positionId:1
    },
    {
      studentId:201910428216,
      name:'string',
      grade:2019,
      gradeId:2019,
      college:'电子信息与电气工程学院',
      collegeId:1,
      professionalClass:'通信2班',
      role:'软件',
      roleId:4,
      position:'方向组长',
      positionId:1
    },
    {
      studentId:201910428217,
      name:'string',
      grade:2019,
      gradeId:2019,
      college:'电子信息与电气工程学院',
      collegeId:1,
      professionalClass:'通信2班',
      role:'软件',
      roleId:4,
      position:'方向组长',
      positionId:1
    }
  ];
  const [newColumns,setNewColumns] = useState<ColumnsType<IUser>>(columns)
  const [userList, setUserList] = useState<IUser[]>(defalutUserList)
  const [gradeList, setGradeList] = useState([])
  const [roleList, setRoleList] = useState([])
  const [collegeList, setCollegeList] = useState([])
  const [positionList, setPositionList] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    setNewColumns([...columns,renderOperation()])
    // getList()
  }, [])

  const renderOperation = () => {
    return {
      title:'操作',
      render:(item:IUser)=>{
        return <div className='operation'>
           <Button type="link" onClick={()=>navigate(`/user-list/mod/${item.studentId}`)}>编辑</Button>
           <Button danger type="link" onClick={()=>{}}>删除</Button>
        </div>
      }
    }
  }

  const getList = () => {
    setLoading(true)
    http.post('/user/list').then((res) => {
      setUserList(lodash.get(res, 'userList', []))
      setGradeList(lodash.get(res, 'gradeList', []))
      setRoleList(lodash.get(res, 'roleList', []))
      setCollegeList(lodash.get(res, 'collegeList', []))
      setPositionList(lodash.get(res, 'positionList', []))
      setLoading(false)
    }).catch(() => {
      setLoading(false)
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
        loading={loading}
      />
    </div>
  )
}
