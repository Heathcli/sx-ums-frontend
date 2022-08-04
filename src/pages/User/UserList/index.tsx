import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import http from '../../../libs/http';

import SubFilter from './component/SubFilter'
import SxTable from '../../../component/SxTable'
import SubHeader from './component/SubHeader';

import WhiteSpace from '../../../UIComponent/WhiteSpace'

import columns from './columns';
import './index.less'

export default function UserList() {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '3',
      name: '胡彦斌2',
      age: 18,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: '胡彦祖2',
      age: 58,
      address: '西湖区湖底公园1号',
    }
  ];
  const [userList, setUserList] = useState([])
  const [gradeList, setGradeList] = useState([])
  const [roleList, setRoleList] = useState([])
  const [collegeList, setCollegeList] = useState([])
  const [positionList, setPositionList] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    setLoading(true)
    http.post('/user/list').then((res) => {
      setUserList(lodash.get(res, 'userList', []))
      setGradeList(lodash.get(res, 'gradeList', []))
      setRoleList(lodash.get(res, 'roleList', []))
      setCollegeList(lodash.get(res, 'collegeList', []))
      setPositionList(lodash.get(res, 'positionList', []))
    }).catch(() => {
      setLoading(false)
    })
  }
  return (
    <div>
      <SubHeader />
      <SubFilter />
      {/* <WhiteSpace height={40} /> */}
      <SxTable
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  )
}
