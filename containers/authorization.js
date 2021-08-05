import styles from './styles.module.scss'
import Login from "../components/Login/Login";

const Authorization = () => {

    return (
        <div className={styles.authorization}>
            <img src="/images/loginImage.jpg" alt=""/>
            <Login/>
        </div>
    )
}

export default Authorization;