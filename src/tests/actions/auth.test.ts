import * as authActions from "../../actions/auth";
import { authActionTypes } from "../../actions/types";

test("should generate login action", () => {
    const userid = "abc123";
    const action = authActions.loggedIn(userid);
    expect(action).toEqual({
        type: authActionTypes.LOGGED_IN,
        userid,
    });
});

test("should generate logout action", () => {
    const action = authActions.loggedOut();
    expect(action).toEqual({
        type: authActionTypes.LOGGED_OUT,
    });
});
