import { render, screen, act } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { shallow, mount } from "enzyme";
import { Button, Drawer, Table, Form } from "antd";
import CustomForm from "./CustomForm";

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

  test("renders learn react link", async() => {
    const util = shallow(<LoginForm />);
    let soret = [
      {
        key: "1",
        name: "arun",
        address: "Chennai",
        phoneNumber: "344536565",
        education: "B.E",
        age: "23",
      },
      {
        key: "2",
        name: "pandi",
        address: "Chennai",
        phoneNumber: "2134326536",
        education: "B.E",
        age: "25",
      },
    ];

    util.find(Table).props().onChange();
    util.find(Table).props().columns[0].sorter.compare(soret[0], soret[1]);
    util.find(Table).props().columns[1].sorter.compare(soret[0], soret[1]);
    util.find(Table).props().columns[3].sorter.compare(soret[0], soret[1]);
    util.find(Table).props().columns[4].sorter.compare(soret[0], soret[1]);
    util.find(Table).props().columns[1].onFilter("chennai", soret[0]);
    util.find(Table).props().columns[5].render().props.onClick(soret[0].key);
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
          isEdit={true}
          id={"1"}
        />
      );
      form
        .find(Form)
        .props()
        .children[0].props.children.props.onChange({ target: "arunpandi" });
      form
        .find(Form)
        .props()
        .children[1].props.children.props.onChange({ target: "arunpandi" });
      form
        .find(Form)
        .props()
        .children[2].props.children.props.onChange({ target: "arunpandi" });
      form
        .find(Form)
        .props()
        .children[3].props.children.props.onChange({ target: "arunpandi" });
      form
        .find(Form)
        .props()
        .children[4].props.children.props.onChange({ target: "arunpandi" });
        form.find(Form).props().onFinish()        
    });

    const renderButton=shallow(<LoginForm />)
   const div =renderButton.find("#button") 
   div.props().children.props.onCreate()
   div.props().children.props.onEdit()
   
    expect(util.find(Table).exists()).toBe(true);
    expect(util.find(Drawer).exists()).toBe(true);
  });
});
