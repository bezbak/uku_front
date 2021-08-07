import styles from './styles.module.scss'
import Index from "../components/Login";

const Authorization = () => {

    return (
        <div className={styles.authorization}>
            <img src="/images/loginImage.jpg" alt=""/>
            <Index/>
        </div>
    )
}

export default Authorization;