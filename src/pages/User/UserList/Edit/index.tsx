import { Button, Form, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../../../../libs/http'
import './index.less'
const Item = Form.Item
const Option = Select.Option

interface Props {
    isAdd?:false
}

export default function Edit(props:Props) {

    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [gradeList, setGradeList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [collegeList, setCollegeList] = useState([])
    const [positionList, setPositionList] = useState([])


    useEffect(() => {
        if (props.isAdd) {
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
            message.success('????????????')
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
                    label='??????'
                    name='name'
                    validateTrigger='onBlur'
                    rules={[
                        {
                            required: true,
                            pattern: /^[\u4e00-\u9fa5A-Za-z]{2,20}$/,
                            message: '????????????????????????',
                            type: 'string',
                            min: 2,
                            max: 20
                        }
                    ]}
                >
                    <Input showCount maxLength={20} placeholder='???????????????'></Input>
                </Item>
                <Item
                    label='??????'
                    name='studentId'
                    validateTrigger='onBlur'
                    rules={[
                        {
                            required: true,
                            pattern: /^[0-9]{12}$/,
                            message: '????????????????????????'
                        }
                    ]}
                >
                    <Input showCount maxLength={12} placeholder='?????????12?????????'></Input>
                </Item>
                <Item
                    label='??????'
                    name='password'
                    extra='?????????6-16???????????????????????????????????????_ * #'
                    validateTrigger='onBlur'
                    rules={[
                        {
                            required: true,
                            pattern: /^[A-Za-z0-9_*#]{6,16}$/,
                            message: '????????????????????????',
                            type: 'string',
                            min: 6,
                            max: 16
                        }
                    ]}
                >
                    <Input.Password maxLength={16}></Input.Password>
                </Item>
                <Item
                    label='??????'
                    name='grade'
                    rules={[
                        {
                            required: true,
                            message: '?????????????????????'
                        }
                    ]}
                >
                    <Select placeholder='?????????????????????'>
                        <Option key={1} value={2019}>2019</Option>
                        {/* {
                            gradeList.map((item)=>{
                                return <Option key={item.code} value={item.name}>{item.name}</Option>
                            })
                        } */}
                    </Select>
                </Item>
                <Item
                    label='??????'
                    name='college'
                    rules={[
                        {
                            required: true,
                            message: '?????????????????????'
                        }
                    ]}
                >
                    <Select placeholder='?????????????????????'>
                        <Option key={1} value='?????????????????????????????????'>?????????????????????????????????</Option>
                        {/* {
                            collegeList.map((item)=>{
                                return <Option key={item.code} value={item.name}>{item.name}</Option>
                            })
                        } */}
                    </Select>
                </Item>
                <Item
                    label='????????????'
                    name='professionalClass'
                    extra='?????????????????????+??????????????????????????????????????????2???'
                    rules={[
                        {
                            required: true,
                            pattern: /^[\u4e00-\u9fa5]+[1-9]???$/,
                            message: '?????????????????????????????????????????????',
                        }
                    ]}
                >
                    <Input showCount maxLength={20}></Input>
                </Item>
                <Item
                    label='??????'
                    name='role'
                    rules={[
                        {
                            required: true,
                            message: '????????????????????????????????????'
                        }
                    ]}
                >
                    <Select placeholder='????????????????????????????????????'>
                        <Option key={1} value='??????'>??????</Option>
                        {/* {
                            roleList.map((item)=>{
                                return <Option key={item.code} value={item.name}>{item.name}</Option>
                            })
                        } */}
                    </Select>
                </Item>
                <Item
                    label='??????'
                    name='position'
                    rules={[
                        {
                            required: true,
                            message: '??????????????????????????????'
                        }
                    ]}
                >
                    <Select placeholder='??????????????????????????????'>
                        <Option key={1} value='????????????'>????????????</Option>
                        {/* {
                            positionList.map((item)=>{
                                return <Option key={item.code} value={item.name}>{item.name}</Option>
                            })
                        } */}
                    </Select>
                </Item>
                <Item>
                    <Button className='submit-btn' onClick={goback}>
                        ??????
                    </Button>
                    <Button className='submit-btn' type="primary" htmlType="submit" loading={loading}>
                        ??????
                    </Button>
                </Item>
            </Form>
        </div>
    )
}
