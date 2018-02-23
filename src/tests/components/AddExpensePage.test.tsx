import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { AddExpensePage } from "../../components/AddExpensePage";
import IExpense from "../../interfaces/IExpense";
import expenses from "../fixtures/expenses";

let startAddExpense: jest.Mock; let history: { push: jest.Mock };
let wrapper: ShallowWrapper<React.Component>;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test("should render AddExpensePage correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit (add expense)", () => {
    const fn: (expense: IExpense) => void = wrapper.find("ExpenseForm").prop("onFormSubmit");
    if (!!fn) {
        fn((expenses as IExpense[])[1]);
    }
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
