import { Breadcrumb } from 'antd'
import React from 'react'

export default function SubHeader() {
    return (
        <div style={{padding:'12px 0 12px 12px',borderBottom:'1px solid #e8e8e8'}}>
            <Breadcrumb>
                <Breadcrumb.Item className='breadcrumb'>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item className='breadcrumb'>用户列表</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}
