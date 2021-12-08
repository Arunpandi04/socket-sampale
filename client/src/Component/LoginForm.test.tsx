import { render, screen, act } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { shallow ,mount} from "enzyme";
import { Button, Drawer, Table, Form } from "antd";
import CustomForm from "./CustomForm";
import { userForm } from "./LoginForm";

describe("Test", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {},
        };
      },
    });
  });

  test("renders learn react link", () => {
    const util = shallow(<LoginForm />);
    let data: userForm = {
      key: "1",
      name: "arun",
      address: "Chennai",
      phoneNumber: "344536565",
      education: "B.E",
      age: "23",
    };
    let soret= [{key:"1",name:"arun",address:"Chennai",phoneNumber:"344536565",education:"B.E",age:"23"},{key:"2",name:"pandi",address:"Chennai",phoneNumber:"2134326536",education:"B.E",age:"25"}]

    util.find(Table).props().onChange()
    util.find(Table).props().columns[0].sorter.compare(soret[0],soret[1])
    util.find(Table).props().columns[1].sorter.compare(soret[0],soret[1])
    util.find(Table).props().columns[3].sorter.compare(soret[0],soret[1])
    util.find(Table).props().columns[4].sorter.compare(soret[0],soret[1])
    util.find(Table).props().columns[1].onFilter("chennai",soret[0])
    util.find(Table).props().columns[5].render().props.onClick();
    const drawer = util.find(Drawer).props().footer.props.children.props;
    util.find(Drawer).props().onClose();
    util.find("#newbtn").simulate("click");
    drawer.onClick();
    const onCreate = jest.fn();
    const handleChange = jest.fn();
    const onEdit = jest.fn();
    act(() => {
      const form = mount(
        <CustomForm
          onCreate={onCreate}
          handleChange={handleChange}
          onEdit={onEdit}
          isEdit={false}
          data={data}
          id={"1"}
        />
      )
      console.log("ujnj", form.find(Form).props().onFinish(data));
      console.log("ujnj", form.find(Form).props().children[0].props.children.props.onChange({target:"arunpandi"}));
    });
    expect(util.find(Table).exists()).toBe(true);
    expect(util.find(Drawer).exists()).toBe(true);
  });
});
