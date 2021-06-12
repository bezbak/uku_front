import React from "react";
import style from "./styles.module.scss"

const Login = ({children}) => {
  return (
    <div className={style.loginContainer}>
      <div className={style.loginContainer_left}
           style={{background: `url(images/loginBg.png)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}
      >
      </div>
      <div className={style.loginContainer_right}>
        {children}
      </div>
    </div>
  )
};
export default Login;