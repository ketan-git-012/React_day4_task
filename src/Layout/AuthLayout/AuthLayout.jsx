import { Component } from 'react';
import { Route } from 'react-router';
import { Navbar, Footer } from './../Components';

export const AuthLayout = ({ children, ...rest }) => {
    console.log(children);
    return (
        <div>
            <Navbar></Navbar>
            <div className="main">{children}</div>
            <Footer></Footer>
        </div>
    )
}


export const AuthLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps =>(
            <AuthLayout>
                <Component {...matchProps} />
            </AuthLayout>
        )} />
    )
}