import moment from "../__mocks__/mock-moment";
import IExpense from "../../interfaces/IExpense";
import IFilterState from "../../interfaces/IFilterState";
import selectExpenses from "../../selectors/expenses";
import expenses from "../fixtures/expenses";

test("should filter by text value", () => {
    const filters = {
        endDate: null,
        sortBy: "date",
        startDate: null,
        text: "e",
    };
    const result = selectExpenses(expenses as IExpense[], filters as IFilterState);
    expect(result).toEqual([expenses[2], expenses[1]]);
});

test("should filter by end date", () => {
    const filters = {
        endDate: moment(0).add(2, "days"),
        sortBy: "date",
        startDate: null,
        text: "",
    };
    const result = selectExpenses(expenses as IExpense[], filters as IFilterState);
    expect(result).toEqual([expenses[0], expenses[1]]);
});

test("should filter by start date", () => {
    const filters = {
        endDate: null,
        sortBy: "date",
        startDate: moment(0),
        text: "",
    };
    const result = selectExpenses(expenses as IExpense[], filters as IFilterState);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

test("should sort by amount", () => {
    const filters = {
        endDate: null,
        sortBy: "amount",
        startDate: null,
        text: "",
    };
    const result = selectExpenses(expenses as IExpense[], filters as IFilterState);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});

test("should sort by date", () => {
    const filters = {
        endDate: null,
        sortBy: "date",
        startDate: null,
        text: "",
    };
    const result = selectExpenses(expenses as IExpense[], filters as IFilterState);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});
