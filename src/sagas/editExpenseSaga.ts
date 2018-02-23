import { call, put, select, take } from "redux-saga/effects";
import * as expenseActions from "../actions/expenses";
import { expenseActionTypes } from "../actions/types";

import { editExpenseInDatabase } from "../firebase/expenses";
import IAppState from "../interfaces/IAppState";

export default function* editExpenseAsync() {
    while (true) {
        const action = yield take(expenseActionTypes.START_EDIT_EXPENSE);
        const userid = yield select((state: IAppState) => state.auth.userid);
        yield call(editExpenseInDatabase, action.id, action.updates, userid);
        yield put(expenseActions.editExpense(action.id, action.updates));
    }
}
