import styles from './styles.module.scss'
import Login from "../components/Login";
import LoginConfirmation from "../components/Login/LoginConfirmation";
import {login} from "../components/Login/state";
import {useRecoilState} from "recoil";
import Registration from "../components/Login/Registration";

const Authorization = () => {

    const [loginState, setLoginState] = useRecoilState(login)

    return (
        <div className={styles.authorization}>
            <img src="/images/loginImage.jpg" alt=""/>
            {
                {
                    login: <Login/>,
                    toConfirm: <LoginConfirmation/>,
                    register: <Registration/>
                }[loginState.state]
            }


        </div>
    )
}

export default Authorization;