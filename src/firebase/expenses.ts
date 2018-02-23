import * as firebase from "firebase";
import IExpense from "../interfaces/IExpense";
import database from "./firebase";

export const addExpenseToDatabase = async (expense: IExpense, userid: string) => {
    const result = await database.ref(`users/${userid}/expenses`).push(expense);
    return {
        ...expense,
        id: result.key,
    };
};

export const editExpenseInDatabase = async (id: string, updates: {}, userid: string) => {
    await database.ref(`users/${userid}/expenses/${id}`).update({...updates});
};

export const removeExpenseFromDatabase = async (id: string, userid: string) => {
    await database.ref(`users/${userid}/expenses/${id}`).remove();
};

export const getExpensesFromDatabase = async (userid: string) => {
    const snapshot = await database.ref(`users/${userid}/expenses`).once("value");
    const expenses: IExpense[] = [];
    snapshot.forEach((item: firebase.database.DataSnapshot) => {
        expenses.push({
            ...item.val(),
            id: item.key,
        });
    });
    return expenses;
};
