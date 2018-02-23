import { call, put, take } from "redux-saga/effects";
import * as authActions from "../actions/auth";
import { authActionTypes } from "../actions/types";

import { login } from "../firebase/auth";

export default function* loginAsync() {
    while (true) {
        yield take(authActionTypes.START_LOGIN);
        const userid = yield call(login);
        yield put(authActions.loggedIn(userid));
    }
}
