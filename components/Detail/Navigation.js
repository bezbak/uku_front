import styles from './styles.module.scss'
import {useRouter} from "next/router";


const Navigation = () => {

    const router = useRouter()

    return (
        <div className={styles.navigation}>
            <div>
                <button
                    onClick={() => router.push("/")}
                    className={styles.navBack}><img src="/icons/leftArrow.png" alt=""/>Назад
                </button>
            </div>
            <div>
                <button>Редактировать</button>
                <button>Удалить</button>
            </div>
        </div>
    )
}

export default Navigation;