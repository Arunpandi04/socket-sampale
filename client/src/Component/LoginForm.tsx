import React, { useState, useEffect } from 'react';
import {  Button, Alert, Drawer, Table } from "antd";
import { v4 as uuidv4 } from 'uuid';
import "antd/dist/antd.css";
import "./LoginForm.css";
import { PlusOutlined } from '@ant-design/icons';
import CustomForm from './CustomForm'

export interface userForm{
  name: string 
  address: string
  phoneNumber: string
  education: string
  age: string
  key?: string
}
let data= [{key:"1",name:"arun",address:"Chennai",phoneNumber:"344536565",education:"B.E",age:"23"},{key:"2",name:"pandi",address:"Chennai",phoneNumber:"2134326536",education:"B.E",age:"25"}]

const LoginForm = () => {
  const [formData, setFormData] = useState<userForm>({ 
    name: "" ,
    address: "",
    phoneNumber: '',
    education: "",
    age: ""
  })
  const [error, setError] = useState('')
  const [state, setState] = useState({ visible: false });
  const [stateEdit, setStateEdit] = useState("");
  const [value, setValue] = useState([])
  const [row, setRow] = useState(false)
  const [load,setLoad]=useState(false)
  const[filter,setFilter]=useState() as any

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },

    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'Chennai', value: 'Chennai' },
        { text: 'Dubai', value: 'Dubai' },
        {text: 'Ramnad', value: 'Ramnad'}
      ],
      filteredValue: filter?.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: {
        compare: (a, b) => a.address.localeCompare(b.address),
        multiple: 3,
      },
    },
    {
      title: 'phoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Education',
      dataIndex: 'education',
      key: 'education',
      sorter: {
        compare: (a, b) => a.education.localeCompare(b.education),
        multiple: 3,
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: {
        compare: (a, b) => a.age - b.age,
        multiple: 4,
      },
    },
    {
      title:'Edit',
      dataIndex: 'key',
      render :(_,data:any)=>{
       return (<Button id="btn" type="primary" onClick={()=>showEditDrawer(data?.key)}>
        Edit
        </Button>)
      }
    }
  ]

 const  showDrawer = () => {

  setFormData({name: "" ,
  address: "",
  phoneNumber: "",
  education: "",
  age: ""})
  setRow(false)
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setFormData({name: "" ,
    address: "",
    phoneNumber: "",
    education: "",
    age: ""});
    setError("")
    setState({
      visible: false,
    });
  };
  
 const  showEditDrawer = (id:string) => {
  // const data: any = localStorage.getItem("data")

console.log("id---->",id)
  const res = data.filter((e:any)=> e.key === id)
  setFormData({
    name: res[0]?.name ,
    address: res[0]?.address,
    phoneNumber: res[0]?.phoneNumber,
    education: res[0]?.education,
    age: res[0]?.age,
    key: res[0]?.key
  })
  setStateEdit(res[0]?.key)
   setRow(true)
   setState({
    visible: true,
  });
};


  
  useEffect(() => {
    let datavalue: any = localStorage.getItem("data")
    let a : any = [];
    a.push(JSON.parse(datavalue))
    setValue(a)

  },[load,formData]);


  const onFinish = () => {
    formData.key = uuidv4()
    console.log("Received values of form: ", formData);
    const data: any = localStorage.getItem("data")
    let value :any =[]
    if (localStorage.getItem("data") === null) {
      console.log("pass");
      value.push(formData)
    }
    else {
      value =JSON.parse(data)
    value.push(formData)
    }
      localStorage.setItem("data", JSON.stringify(value))
    setFormData({name: "" ,
    address: "",
    phoneNumber: "",
    education: "",
    age: ""});
    setError("")
    setLoad(true)
    setState({
      visible: false,
    });
  };


  const onFinishEdit = () => {
    console.log("Received values of form:");
    setRow(false)
    setState({
      visible: false,
    });
    
    let datavalue: any = localStorage.getItem("data")
    const value : any = JSON.parse(datavalue)
     if (value.length>0) {
     value.map((e:any)=>{
        if(e.key === stateEdit){
          e.name=formData.name
          e.address= formData.address
    e.phoneNumber= formData.phoneNumber
    e.education= formData.education
    e.age= formData.age
        }
        return true
      })

    }
    localStorage.setItem("data", JSON.stringify(value))
    setFormData({name: "" ,
    address: "",
    phoneNumber: "",
    education: "",
    age: ""});
    setError("")
  };


  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("onchange--->")
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }

  function onChange( filters, sorter) {
    console.log('params', filters, sorter);
    setFilter(filters)
  }

  return (
    <div>
      <div className="header" style={{paddingTop:"10px"}}
     >
       <Button id ="newbtn"className="form" type="primary" onClick={showDrawer}>
          <PlusOutlined /> New account
          </Button>
          </div>
          <br />
   <Drawer
          title={row ? "Edit Details" : "Create a new account"}
          width={420}
          height={10}
          onClose={()=>onClose()}
          visible={state.visible}
          footer={
            <div
            className="submit"
              style={{
                textAlign: 'right',
              }}
            >
              <Button id="cancel"onClick={()=>onClose()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
            </div>
          }
        >
        {error && <Alert style={{width:"19rem"}}message={error} type="error" />}
        <CustomForm onCreate={onFinish} handleChange={handleChange} onEdit={onFinishEdit} isEdit={row} data={formData} id={formData.key}/>
        </Drawer>
      <div>      
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange} 
        />
      </div>
      

    </div>
  );
};
export default LoginForm;
