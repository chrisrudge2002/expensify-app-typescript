import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import IAppState from "../interfaces/IAppState";

interface IPublicRouteProps extends RouteProps {
    isAuthenticated: boolean;
    component: React.ComponentClass<any> | React.StatelessComponent<any>;
}

export class PublicRoute extends Route<IPublicRouteProps> {
    public render() {
        const { isAuthenticated, component: Component, ...rest } = this.props;
        return (
            <Route {...rest} component={(props: IPublicRouteProps) => (
                !isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/dashboard" />
                )
            )} />
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    isAuthenticated: !!state.auth.userid,
});

export default connect(mapStateToProps)(PublicRoute);
