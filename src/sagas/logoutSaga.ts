import { call, put, take } from "redux-saga/effects";
import * as authActions from "../actions/auth";
import { authActionTypes } from "../actions/types";

import { logout } from "../firebase/auth";

export default function* logoutAsync() {
    while (true) {
        yield take(authActionTypes.START_LOGOUT);
        yield call(logout);
        yield put(authActions.loggedOut());
    }
}
