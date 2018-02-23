import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import authReducer from "../reducers/auth";
import expenseReducer from "../reducers/expenses";
import filterReducer from "../reducers/filters";
import authRootSaga from "../sagas/authRootSaga";
import expensesRootSaga from "../sagas/expensesRootSaga";

import { composeWithDevTools } from "redux-devtools-extension";

function *rootSaga() {
    yield all([
        authRootSaga(),
        expensesRootSaga(),
    ]);
}

export default () => {
    const reducer = combineReducers({
        auth: authReducer,
        expenses: expenseReducer,
        filters: filterReducer,
    });

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);

    return store;
};
