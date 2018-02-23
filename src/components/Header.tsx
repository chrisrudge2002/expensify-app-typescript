import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";
import * as authActions from "../actions/auth";

interface IHeaderProps {
    startLogout: () => AnyAction;
}

export const Header: React.SFC<IHeaderProps> = (props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Expensify</h1>
                </Link>
                <button className="button button--link" onClick={props.startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    startLogout: () => dispatch(authActions.startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
