import { shallow } from "enzyme";
import * as React from "react";
import ExpenseListItem from "../../components/ExpenseListItem";
import IExpense from "../../interfaces/IExpense";
import expenses from "../fixtures/expenses";

test("should render ExpenseListItem correctly", () => {
    const wrapper = shallow(<ExpenseListItem {...(expenses as IExpense[])[1]} />);
    expect(wrapper).toMatchSnapshot();
});
