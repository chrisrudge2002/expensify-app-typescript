import { shallow } from "enzyme";
import * as React from "react";
import NotFoundPage from "../../components/NotFoundPage";

test("should render NotFoundPage correctly", () => {
    const wrapper: any = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});
