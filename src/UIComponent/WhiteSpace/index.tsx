import React from 'react'
import './index.less'

interface Iprops {
  height?: number
}

export default function WhiteSpace(props: Iprops) {

  const { height = 10 } = props
  return (
    <div className='white-space' style={{ height: height }} />
  )
}
