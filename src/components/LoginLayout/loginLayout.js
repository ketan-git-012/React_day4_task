const LoginLayout = ({children, ...rest}) =>{
    // console.log(children);

    return (
        <div className="page page-login">
            <div className="main"> {children}</div>
        </div>
    )
}


export default LoginLayout;