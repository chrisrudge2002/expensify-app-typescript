import { expenseActionTypes } from "../../actions/types";
import IExpense from "../../interfaces/IExpense";
import reducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default expense state", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state).toEqual([]);
});

test("should add expense", () => {
    const expense = {
        amount: 29500,
        createdAt: 20000,
        description: "Laptop",
        id: "109",
        note: "",
    };
    const action = {
        expense,
        type: expenseActionTypes.ADD_EXPENSE,
    };
    const state = reducer(expenses as IExpense[], action);
    expect(state).toEqual([...expenses, expense]);
});

test("should edit expense by id", () => {
    const amount = 122000;
    const action = {
        id: expenses[1].id,
        type: expenseActionTypes.EDIT_EXPENSE,
        updates: {
            amount,
        },
    };
    const state = reducer(expenses as IExpense[], action);
    expect(state[1].amount).toBe(amount);
});

test("should not edit expense if id not found", () => {
    const amount = 122000;
    const action = {
        id: -1,
        type: expenseActionTypes.EDIT_EXPENSE,
        updates: {
            amount,
        },
    };
    const state = reducer(expenses as IExpense[], action);
    expect(state).toEqual(expenses);
});

test("should remove expense by id", () => {
    const action = {
        id: expenses[1].id ,
        type: expenseActionTypes.REMOVE_EXPENSE,
    };
    const state = reducer(expenses as IExpense[], action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
    const action = {
        id: "-1",
        type: expenseActionTypes.REMOVE_EXPENSE,
    };
    const state = reducer(expenses as IExpense[], action);
    expect(state).toEqual(expenses);
});

test("should populate expenses on data retrieval", () => {
    const state = reducer(undefined, { type: expenseActionTypes.GOT_EXPENSES, expenseList: expenses });
    expect(state).toEqual(expenses);
});
