import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import * as authActions from "../actions/auth";

interface ILoginPageProps {
    startLogin: () => AnyAction;
}

export const LoginPage: React.SFC<ILoginPageProps> = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>It's time to get your expenses under control.</p>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    startLogin: () => dispatch(authActions.startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
