import { call, put, select, take } from "redux-saga/effects";
import * as expenseActions from "../actions/expenses";
import { expenseActionTypes } from "../actions/types";

import { getExpensesFromDatabase } from "../firebase/expenses";
import IAppState from "../interfaces/IAppState";

export default function* getExpensesAsync() {
    while (true) {
        yield take(expenseActionTypes.GET_EXPENSES);
        const userid = yield select((state: IAppState) => state.auth.userid);
        const dbExpenseList = yield call(getExpensesFromDatabase, userid);
        yield put(expenseActions.gotExpenses(dbExpenseList));
    }
}
