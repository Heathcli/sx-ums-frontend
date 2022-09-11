import { Table } from 'antd';
import  { v4 }  from 'uuid'
import React from 'react'

export default function SxTable(props:any) {
  console.log(props);
  
  return (
    <Table
      bordered
      loading={props.loading}
      dataSource={props.dataSource}
      expandable={props.expandable}
      columns={props.columns}
      pagination={props.pageSize ? { position: ['bottomCenter'], pageSize: props.pageSize } : false}
      locale={
        {
          triggerDesc: '点击降序',
          triggerAsc: '点击升序',
          cancelSort: '取消排序',
        }
      }
      rowKey={(record) => record.id || record.studentId}
    />

  )
}