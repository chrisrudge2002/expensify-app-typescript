import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as authActions from "./actions/auth";
import * as expenseActions from "./actions/expenses";
import LoadingPage from "./components/LoadingPage";
import { firebase } from "./firebase/firebase";
import IAppState from "./interfaces/IAppState";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

store.subscribe(() => {
    if ((store.getState() as IAppState).auth.expensesRetrieved) {
        renderApp();
        if (history.location.pathname === "/") {
            history.push("/dashboard");
        }
    }
});

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(app, document.getElementById("app"));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(authActions.loggedIn(user.uid));
        store.dispatch(expenseActions.getExpenses());
    } else {
        store.dispatch(authActions.loggedOut());
        renderApp();
        history.push("/");
    }
});
