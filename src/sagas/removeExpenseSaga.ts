import { call, put, select, take } from "redux-saga/effects";
import * as expenseActions from "../actions/expenses";
import { expenseActionTypes } from "../actions/types";

import { removeExpenseFromDatabase } from "../firebase/expenses";
import IAppState from "../interfaces/IAppState";

export default function* removeExpenseAsync() {
    while (true) {
        const action = yield take(expenseActionTypes.START_REMOVE_EXPENSE);
        const userid = yield select((state: IAppState) => state.auth.userid);
        yield call(removeExpenseFromDatabase, action.id, userid);
        yield put(expenseActions.removeExpense(action.id));
    }
}
