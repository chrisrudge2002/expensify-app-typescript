import { call, put, take } from "redux-saga/effects";
import * as authActions from "../actions/auth";
import { authActionTypes, loginTypes } from "../actions/types";

import { loginWithGitHub, loginWithGoogle } from "../firebase/auth";

export default function* loginAsync() {
    while (true) {
        const action = yield take(authActionTypes.START_LOGIN);
        let userid: string | undefined;

        if (action.loginType === loginTypes.GITHUB) {
            userid = yield call(loginWithGitHub);
        } else if (action.loginType === loginTypes.GOOGLE) {
            userid = yield call(loginWithGoogle);
        }

        if (userid) {
            yield put(authActions.loggedIn(userid));
        }
    }
}
