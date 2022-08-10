import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import './index.less'
import { UserOutlined } from '@ant-design/icons';
import WhiteSpace from '../../UIComponent/WhiteSpace';
import http from '../../libs/http';
import { useNavigate } from 'react-router-dom';

type login = {
  username:number,
  password:string
}

export default function Login() {
  
  const [loading,setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (value:login) => {
    setLoading(true)
    http.post('/login',value).then((res)=>{
      getRouter()
      // document.cookie = "url=" + encodeURIComponent(res.studentId)
    }).catch(()=>{
      form.setFieldsValue({
        password:''
      })
      setLoading(false)
    })
  }

  const getRouter = () => {
    setLoading(true)
    http.post('/name').then(()=>{
      message.success('登录成功')
      window.location.href = '/home'
      setLoading(false)
    }).catch(()=>{
      setLoading(false)
    })
  }

  return (
    <div className='sx-login-body'>
      <div className='sx-login'>
        <Form
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入学号' }]}
          >
            <Input placeholder='请输入学号' prefix={<UserOutlined />} />
          </Form.Item>
          <WhiteSpace height={10} />
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='请输入密码' prefix={<UserOutlined />} />
          </Form.Item>
          <WhiteSpace height={10} />
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='tip'>注册请联系赛行工作室负责人。</div>
    </div>
  )
}
