import { shallow } from "enzyme";
import * as React from "react";
import { ExpenseList } from "../../components/ExpenseList";
import IExpense from "../../interfaces/IExpense";
import expenses from "../fixtures/expenses";

test("should render ExpenseList with expenses", () => {
    const wrapper = shallow(<ExpenseList expenses={expenses as IExpense[]} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList with empty message", () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});
