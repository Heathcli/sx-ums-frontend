import { SearchOutlined } from '@ant-design/icons'
import { Form, Input, Select } from 'antd'
import qs from 'qs'
import React, { useEffect } from 'react'
import { FilterList } from '../../../../types'
import { SubFilterType } from '../types'

const Item = Form.Item
const { Option } = Select
const { Search } = Input;
interface IProps<T> {
    gradeList:T[],
    roleList:T[],
    collegeList:T[],
    positionList:T[]
}

export default function SubFilter(props:IProps<FilterList>) {

    const [form] = Form.useForm()
    useEffect(() => {
        const search = qs.parse(window.location.search.slice(1));
        form.setFieldsValue({
            grade: search.grade,
            college: search.college,
            role: search.role,
            position: search.position
        });
    }, [])

    const submit = () => {
        form.validateFields().then((values: SubFilterType) => {
            let filter: SubFilterType = {}
            for (let attr in values) {
                if (values[attr]) {
                    filter[attr] = values[attr]
                }
            }
            window.history.pushState(
                null,
                '',
                `${window.location.pathname}?${qs.stringify(filter)}`
            );
        })
    }
    return (
        <div style={{ padding: 17 }}>
            <Form layout="inline" form={form} style={{ display: 'flex', alignItems: 'center' }}>
                <Item label="搜索" name="search">
                    <Search
                        allowClear
                        placeholder="姓名/学号"
                        onSearch={submit}
                    ></Search>
                </Item>
                <Item label="年级" name="grade">
                    <Select
                        placeholder='全部'
                        style={{ width: 100 }}
                        allowClear
                        onChange={submit}>
                        {
                            props.gradeList.map((item)=>{
                                return  <Option key={item.code} value={item.code}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Item>
                <Item label="学院" name="college">
                    <Select
                        placeholder='全部'
                        style={{ width: 200 }}
                        allowClear
                        onChange={submit}>
                        <Option value={'a学院'}>a学院</Option>
                        <Option value={'b学院'}>b学院</Option>
                        <Option value={'c学院'}>c学院</Option>
                    </Select>
                </Item>
                <Item label="角色" name="role">
                    <Select
                        placeholder='全部'
                        style={{ width: 100 }}
                        allowClear
                        onChange={submit}>
                        <Option value={'0'}>a角色</Option>
                        <Option value={'1'}>b角色</Option>
                        <Option value={'2'}>c角色</Option>
                    </Select>
                </Item>
                <Item label="职能" name="position">
                    <Select
                        placeholder='全部'
                        style={{ width: 100 }}
                        allowClear
                        onChange={submit}>
                        <Option value={'0'}>a职能</Option>
                        <Option value={'1'}>b职能</Option>
                        <Option value={'2'}>c职能</Option>
                    </Select>
                </Item>
            </Form>
        </div>
    )
}
