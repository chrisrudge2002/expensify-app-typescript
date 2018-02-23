import { shallow } from "enzyme";
import * as React from "react";
import LoadingPage from "../../components/LoadingPage";

test("should render LoadingPage correctly", () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();
});
