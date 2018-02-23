import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { Header } from "../../components/Header";

let startLogout: jest.Mock;
let wrapper: ShallowWrapper<React.Component>;

beforeEach(() => {
    startLogout = jest.fn();
    wrapper = shallow(<Header startLogout={startLogout} />);
});

test("should render Header component correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should call startLogout on button click", () => {
    wrapper.find("button").simulate("click");
    expect(startLogout).toHaveBeenCalled();
});
