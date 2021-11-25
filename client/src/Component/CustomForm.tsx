import React, { useEffect } from 'react';
import {  Form, Input, Button}from "antd";
import "antd/dist/antd.css";
import "./LoginForm.css";
import {userForm} from './LoginForm'

interface Props{
  onCreate: (data:any)=>void
  onEdit: (data:any)=>void
  handleChange: (e:any)=>void
  isEdit: Boolean
  data:userForm
  id?: string
}


const CustomForm =(props: Props)=>{
  const{onCreate,onEdit,isEdit,data,handleChange} = props
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data)
   }, [form, data])

   
    return(
        <>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 13}}
          labelAlign='left'
          layout="horizontal"
          initialValues={data}
          onFinish={isEdit ? onEdit : onCreate}
        >
          <Form.Item
            name="name"
            label="name"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              placeholder="Name"
              name="name"
              onChange={(e: any) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
          label="Address"
            name="address"
            // initialValue={data.address}
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input
            value={data.address}
            name="address"
              placeholder="Address"
              onChange={(e: any) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
           label="phoneNumber"
           name="phoneNumber"
            // initialValue={data.phoneNumber}
            rules={[
              {
                required: true,
                message: "Please input your phoneNumber!",
              },
            ]}
          >
            <Input
            name="phoneNumber"
              placeholder="PhoneNumber"
              onChange={(e: any) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
           label="Education"
           name="education"
            // initialValue={data.education}
            rules={[
              {
                required: true,
                message: "Please input your education!",
              },
            ]}
          >
            <Input
            name="education"
              placeholder="Education"
              onChange={(e: any) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
          label="Age"
          name="age"
            // initialValue={data.age}
            rules={[
              {
                required: true,
                message: "Please input your Age!",
              },
            ]}
          >
            <Input
            name="age"
              placeholder="Age"
              onChange={(e: any) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              submit
            </Button>
          </Form.Item>
        </Form>
     
        </>
    )
}

export default CustomForm