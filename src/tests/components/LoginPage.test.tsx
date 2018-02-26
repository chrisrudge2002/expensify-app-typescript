import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { LoginPage } from "../../components/LoginPage";

let startLoginGitHub: jest.Mock; let startLoginGoogle: jest.Mock;
let wrapper: ShallowWrapper<React.Component>;

beforeEach(() => {
    startLoginGitHub = jest.fn();
    startLoginGoogle = jest.fn();
    wrapper = shallow(<LoginPage
                            startLoginGitHub={startLoginGitHub}
                            startLoginGoogle={startLoginGoogle} />);
});

test("should render LoginPage component correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should call startLogin (GitHub) on button click", () => {
    wrapper.find("button").at(0).simulate("click");
    expect(startLoginGitHub).toHaveBeenCalled();
});

test("should call startLogin (Google) on button click", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(startLoginGoogle).toHaveBeenCalled();
});
