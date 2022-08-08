import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/slice/userSlice'
import './index.less'

export default function Home() {
  const { userInfo } = useAppSelector(selectUser)
  
  return (
    <div className='a'>
        {userInfo.studentId}
    </div>
  )
}
