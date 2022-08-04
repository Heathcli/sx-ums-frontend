import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import http from '../../../libs/http';

import SubFilter from './component/SubFilter'
import SxTable from '../../../component/SxTable'
import SubHeader from './component/SubHeader';

import WhiteSpace from '../../../UIComponent/WhiteSpace'

import columns from './columns';
import './index.less'
import { IUser } from './types';

export default function UserList() {
  const defalutUserList = [
    {
      studentId:201910428215,
      name:'string',
      grade:2019,
      college:'电子信息',
      professionalClass:'通信2班',
      role:'软件',
      position:'方向组长'
    },
    {
      studentId:201910428216,
      name:'string',
      grade:2019,
      college:'电子信息',
      professionalClass:'通信2班',
      role:'软件',
      position:'方向组长'
    },
    {
      studentId:201910428217,
      name:'string',
      grade:2019,
      college:'电子信息',
      professionalClass:'通信2班',
      role:'软件',
      position:'方向组长'
    }
  ];
  const [userList, setUserList] = useState<IUser[]>(defalutUserList)
  const [gradeList, setGradeList] = useState([])
  const [roleList, setRoleList] = useState([])
  const [collegeList, setCollegeList] = useState([])
  const [positionList, setPositionList] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // getList()
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
      <SubFilter 
      gradeList={gradeList}
      roleList={roleList}
      collegeList={collegeList}
      positionList={positionList}
      />
      {/* <WhiteSpace height={40} /> */}
      <SxTable
        dataSource={userList}
        columns={columns}
        loading
      />
    </div>
  )
}
