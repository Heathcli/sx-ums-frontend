import { Table } from 'antd';
import  { v4 }  from 'uuid'
import React from 'react'

export default function SxTable(props:any) {
  return (
    <Table
      bordered
      loading={props.loading}
      dataSource={props.dataSource}
      columns={props.columns}
      pagination={{ position: ['bottomCenter'], pageSize: 20 }}
      locale={
        {
          triggerDesc: '点击降序',
          triggerAsc: '点击升序',
          cancelSort: '取消排序',
        }
      }
      rowKey={()=> v4()}
    />

  )
}