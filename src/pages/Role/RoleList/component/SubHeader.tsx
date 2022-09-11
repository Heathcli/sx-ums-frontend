import { Breadcrumb, Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SubHeader() {

    const navigate = useNavigate()

    return (
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:12,borderBottom:'1px solid #e8e8e8'}}>
            <Breadcrumb>
                <Breadcrumb.Item className='breadcrumb'>职能管理</Breadcrumb.Item>
                <Breadcrumb.Item className='breadcrumb'>角色列表</Breadcrumb.Item>
            </Breadcrumb>
            <Button type="primary" onClick={()=>navigate('/role-manage/role/add')}>新增</Button>
        </div>
    )
}
