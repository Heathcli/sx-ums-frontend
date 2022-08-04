import { Table } from 'antd';
import React from 'react'

export default function SxTable(props: any) {
  return (
    <Table
      bordered
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
    />

  )
}