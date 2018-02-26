import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { EditExpensePage } from "../../components/EditExpensePage";
import IExpense from "../../interfaces/IExpense";
import expenses from "../fixtures/expenses";

let startEditExpense: jest.Mock; let startRemoveExpense: jest.Mock; let history: { push: jest.Mock };
let wrapper: ShallowWrapper<React.Component>;
let rcp: any;

beforeEach(() => {
    rcp = {};
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage
                            {...rcp}
                            expense={(expenses as IExpense[])[1]}
                            startEditExpense={startEditExpense}
                            startRemoveExpense={startRemoveExpense}
                            history={history} />);
});

test("should render EditExpensePage correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit (edit expense)", () => {
    const fn: (expense: IExpense) => void = wrapper.find("ExpenseForm").prop("onFormSubmit");
    if (!!fn) {
        fn((expenses as IExpense[])[1]);
    }
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});
