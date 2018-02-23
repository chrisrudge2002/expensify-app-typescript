import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { LoginPage } from "../../components/LoginPage";

let startLogin: jest.Mock;
let wrapper: ShallowWrapper<React.Component>;

beforeEach(() => {
    startLogin = jest.fn();
    wrapper = shallow(<LoginPage startLogin={startLogin} />);
});

test("should render LoginPage component correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should call startLogin on button click", () => {
    wrapper.find("button").simulate("click");
    expect(startLogin).toHaveBeenCalled();
});
