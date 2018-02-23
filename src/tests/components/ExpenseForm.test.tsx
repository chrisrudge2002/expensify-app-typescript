import { shallow } from "enzyme";
import * as moment from "moment";
import * as React from "react";
import ExpenseForm from "../../components/ExpenseForm";
import IExpense from "../../interfaces/IExpense";
import expenses from "../fixtures/expenses";

test("should render ExpenseForm correctly", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm correctly with expense data", () => {
    const wrapper = shallow(<ExpenseForm expense={(expenses as IExpense[])[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find("form").simulate("submit", {
        preventDefault: () => undefined,
    });
    expect(wrapper.state("error").length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
    const value = "New description";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(0).simulate("change", {
        currentTarget: { value },
    });
    expect(wrapper.state("description")).toBe(value);
});

test("should set note on text area change", () => {
    const value = "New note";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").simulate("change", {
        currentTarget: { value },
    });
    expect(wrapper.state("note")).toBe(value);
});

test("should set amount if valid input", () => {
    const value = "23.50";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        currentTarget: { value },
    });
    expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount if invalid input", () => {
    const value = "12.122";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        currentTarget: { value },
    });
    expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={(expenses as IExpense[])[0]} onFormSubmit={onSubmitSpy} />);
    wrapper.find("form").simulate("submit", {
        preventDefault: () => undefined,
    });
    expect(wrapper.state("error")).toBe("");
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        description: expenses[0].description,
        note: expenses[0].note,
    });
});

test("should set new date on date change", () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    const fn: (moment: moment.Moment) => void = wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange");
    if (!!fn) {
        fn(now);
    }
    expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on change", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    const fn: ({ focused }: { focused: boolean }) => void =
        wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange");
    if (!!fn) {
        fn({ focused });
    }
    expect(wrapper.state("calendarFocused")).toBe(focused);
});
