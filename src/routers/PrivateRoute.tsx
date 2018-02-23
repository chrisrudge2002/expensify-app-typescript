import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Header from "../components/Header";
import IAppState from "../interfaces/IAppState";

interface IPrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
    component: React.ComponentClass<any> | React.StatelessComponent<any>;
}

export class PrivateRoute extends Route<IPrivateRouteProps> {
    public render() {
        const { isAuthenticated, component: Component, ...rest } = this.props;
        return (
            <Route {...rest} component={(props: IPrivateRouteProps) => (
                isAuthenticated ? (
                    <div>
                        <Header />
                        <Component {...props} />
                    </div>
                ) : (
                    <Redirect to="/" />
                )
            )} />
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    isAuthenticated: !!state.auth.userid,
});

export default connect(mapStateToProps)(PrivateRoute);
