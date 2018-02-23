import IExpense from "../interfaces/IExpense";
import { expenseActionTypes } from "./types";

export const startAddExpense = ({ description = "", note = "", amount = 0, createdAt = 0 }: IExpense) => {
    return {
        expense: {
            amount,
            createdAt,
            description,
            note,
        },
        type: expenseActionTypes.START_ADD_EXPENSE,
    };
};

export const startEditExpense = (id: string, updates = {}) => {
    return {
        id,
        type: expenseActionTypes.START_EDIT_EXPENSE,
        updates,
    };
};

export const startRemoveExpense = (id: string = "") => {
    return {
        id,
        type: expenseActionTypes.START_REMOVE_EXPENSE,
    };
};

export const addExpense = (expense: IExpense) => {
    return {
        expense,
        type: expenseActionTypes.ADD_EXPENSE,
    };
};

export const getExpenses = () => {
    return {
        type: expenseActionTypes.GET_EXPENSES,
    };
};

export const gotExpenses = (expenseList: IExpense[]) => {
    return {
        expenseList,
        type: expenseActionTypes.GOT_EXPENSES,
    };
};

export const editExpense = (id: string, updates = {}) => {
    return {
        id,
        type: expenseActionTypes.EDIT_EXPENSE,
        updates,
    };
};

export const removeExpense = (id: string) => {
    return {
        id,
        type: expenseActionTypes.REMOVE_EXPENSE,
    };
};
