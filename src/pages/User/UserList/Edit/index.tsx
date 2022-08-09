import { Button, Form, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../../../../libs/http'
import './index.less'
const Item = Form.Item
const Option = Select.Option

export default function Edit() {

    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [gradeList, setGradeList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [collegeList, setCollegeList] = useState([])
    const [positionList, setPositionList] = useState([])


    useEffect(() => {
        if (id) {
            modInit(Number(id))
        } else {
            addInit()
        }
    }, [])

    const goback = () => {
        navigate('/user-manage/list')
    }

    const addInit = () => {
        http.post('').then((res) => {
            setGradeList(res.gradeList)
            setCollegeList(res.collegeList)
            setRoleList(res.roleList)
            setPositionList(res.positionList)
        })
    }

    const modInit = (id: number) => {
        http.post('', { id }).then((res) => {
            setGradeList(res.gradeList)
            setCollegeList(res.collegeList)
            setRoleList(res.roleList)
            setPositionList(res.positionList)
            form.setFieldsValue({
                name: res.name,
                studentId: res.studentId,
                password: res.password,
                grade: res.grade,
                college: res.college,
                professionalClass: res.professionalClass,
                role: res.role,
                position: res.position
            })
        })
    }

    const onSubmit = (values: any) => {
        setLoading(true)
        let params = values
        params.studentId = Number(params.studentId)
        http.post('', params).then((res) => {
            message.success('操作成功')
            setTimeout(() => {
                goback()
            }, 400);
        }).catch(() => {
            setLoading(false)
        })

    };

    return (
        <div className='sx-user-mod'>
            <Form
                form={form}
                layout='vertical'
                scrollToFirstError
                onFinish={onSubmit}
            >
                <Item
                    label='姓名'
                    name='name'
                    validateTrigger='onBlur'
                    rules={[
                        {
                            required: true,
                            pattern: /^[\u4e00-\u9fa5A-Za-z]{2,20}$/,
                            message: '请输入合法的姓名',
                            type: 'string',
                            min: 2,
                            max: 20
                        }
                    ]}
                >
                    <Input showCount maxLength={20} placeholder='请输入姓名'></Input>
                </Item>
                <Item
                    label='学号'
                    name='studentId'
                    validateTrigger='onBlur'
                    rules={[
                        {
                            required: true,
                            pattern: /^[0-9]{12}$/,
                            message: '请输入合法的学号'
                        }
                    ]}
                >
                    <Input showCount maxLength={12} placeholder='请输入12位学号'></Input>
                </Item>
                <Item
                    label='密码'
                    name='password'
                    extra='请输入6-16位密码，仅限数字、字母以及_ * #'
                    validateTrigger='onBlur'
                    rules={[
                        {
                            required: true,
                            pattern: /^[A-Za-z0-9_*#]{6,16}$/,
                            message: '请设置合法的密码',
                            type: 'string',
                            min: 6,
                            max: 16
                        }
                    ]}
                >
                    <Input.Password maxLength={16}></Input.Password>
                </Item>
                <Item
                    label='年级'
                    name='grade'
                    rules={[
                        {
                            required: true,
                            message: '请选择所在年级'
                        }
                    ]}
                >
                    <Select placeholder='请选择所在年级'>
                        <Option key={1} value={2019}>2019</Option>
                        {/* {
                            gradeList.map((item)=>{
                                return <Option key={item.code} value={item.name}>{item.name}</Option>
                            })
                        } */}
                    </Select>
                </Item>
                <Item
                    label='学院'
                    name='college'
                    rules={[
                        {
                            required: true,
                            message: '请选择所在学院'
                        }
                    ]}
                >
                    <Select placeholder='请选择所在学院'>
                        <Option key={1} value='电子信息与电气工程学院'>电子信息与电气工程学院</Option>
                        {/* {
                            collegeList.map((item)=>{
                                return <Option key={item.code} value={item.name}>{item.name}</Option>
                            })
                        } */}
                    </Select>
                </Item>
                <Item
                    label='专业班级'
                    name='professionalClass'
                    extra='请输入专业全称+班级，例如：计算机科学与技术2班'
                    rules={[
                        {
                            required: true,
                            pattern: /^[\u4e00-\u9fa5]+[1-9]班$/,
                            message: '请参考例子，输入合法的专业班级',
                        }
                    ]}
                >
                    <Input showCount maxLength={20}></Input>
                </Item>
                <Item
                    label='角色'
                    name='role'
                    rules={[
                        {
                            required: true,
                            message: '请选择在团队中所处的角色'
                        }
                    ]}
                >
                    <Select placeholder='请选择在团队中所处的角色'>
                        <Option key={1} value='软件'>软件</Option>
                        {/* {
                            roleList.map((item)=>{
                                return <Option key={item.code} value={item.name}>{item.name}</Option>
                            })
                        } */}
                    </Select>
                </Item>
                <Item
                    label='职能'
                    name='position'
                    rules={[
                        {
                            required: true,
                            message: '请选择在团队中的职能'
                        }
                    ]}
                >
                    <Select placeholder='请选择在团队中的职能'>
                        <Option key={1} value='总管理员'>总管理员</Option>
                        {/* {
                            positionList.map((item)=>{
                                return <Option key={item.code} value={item.name}>{item.name}</Option>
                            })
                        } */}
                    </Select>
                </Item>
                <Item>
                    <Button className='submit-btn' onClick={goback}>
                        返回
                    </Button>
                    <Button className='submit-btn' type="primary" htmlType="submit" loading={loading}>
                        确定
                    </Button>
                </Item>
            </Form>
        </div>
    )
}
