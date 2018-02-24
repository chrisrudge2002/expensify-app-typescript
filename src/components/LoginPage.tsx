import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import * as authActions from "../actions/auth";
import { loginTypes } from "../actions/types";

interface ILoginPageProps {
    startLoginGitHub: () => AnyAction;
    startLoginGoogle: () => AnyAction;
}

export const LoginPage: React.SFC<ILoginPageProps> = ({ startLoginGitHub, startLoginGoogle }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>It's time to get your expenses under control.</p>
            <button className="button" onClick={startLoginGitHub}>Login with GitHub</button>
            <button className="button button--alt" onClick={startLoginGoogle}>Login with Google</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    startLoginGitHub: () => (dispatch(authActions.startLogin(loginTypes.GITHUB)) as AnyAction),
    startLoginGoogle: () => (dispatch(authActions.startLogin(loginTypes.GOOGLE)) as AnyAction),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
