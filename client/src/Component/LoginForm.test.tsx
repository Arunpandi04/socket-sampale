import { render, screen,act } from '@testing-library/react'; 
import LoginForm  from './LoginForm';
import { shallow } from 'enzyme'
import {  Button, Drawer, Table } from "antd";

  describe("Test", () => {
    beforeEach(()=>{
      Object.defineProperty(window, 'matchMedia', {
        value: () => {
          return {
            matches: false,
            addListener: () => {},
            removeListener: () => {}
          };
        }
    })
  })
     test('renders learn react link', () => {
        const util =  shallow(<LoginForm />);
  //let data= [{key:"1",name:"arun",address:"Chennai",phoneNumber:"344536565",education:"B.E",age:"23"},{key:"2",name:"pandi",address:"Chennai",phoneNumber:"2134326536",education:"B.E",age:25}]

        const table = util.find(Table).props().columns[5].render().props.onClick()
        const drawer = util.find(Drawer).props().footer.props.children.props
        const btn = util.find(Drawer).props().onClose()
        util.find('#newbtn').simulate("click")
        drawer.onClick()

        // act(() => {
        //   drawer.find(Button)                           
        // })

        console.log("ujnj",util.find(Table).props())
         
          expect(util.find(Table).exists()).toBe(true)
          expect(util.find(Drawer).exists()).toBe(true)
         });
         

  })