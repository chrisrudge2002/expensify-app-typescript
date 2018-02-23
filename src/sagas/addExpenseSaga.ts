import { call, put, select, take } from "redux-saga/effects";
import * as expenseActions from "../actions/expenses";
import { expenseActionTypes } from "../actions/types";

import { addExpenseToDatabase } from "../firebase/expenses";
import IAppState from "../interfaces/IAppState";

export default function* addExpenseAsync() {
    while (true) {
        const action = yield take(expenseActionTypes.START_ADD_EXPENSE);
        const userid = yield select((state: IAppState) => state.auth.userid);
        const dbExpense = yield call(addExpenseToDatabase, action.expense, userid);
        yield put(expenseActions.addExpense(dbExpense));
    }
}
