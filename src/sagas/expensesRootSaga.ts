import { all } from "redux-saga/effects";
import addExpenseSaga from "./addExpenseSaga";
import editExpenseSaga from "./editExpenseSaga";
import getExpensesSaga from "./getExpensesSaga";
import removeExpenseSaga from "./removeExpenseSaga";

export default function* rootSaga() {
  yield all([
    addExpenseSaga(),
    editExpenseSaga(),
    getExpensesSaga(),
    removeExpenseSaga(),
  ]);
}
