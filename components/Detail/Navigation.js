import styles from './styles.module.scss'
import {useRouter} from "next/router";


const Navigation = (data) => {

    const router = useRouter()

    return (

        <div className={styles.navigation}>
            <div>
                <button
                    onClick={() => router.push("/")}
                    className={styles.navBack}><img src="/icons/leftArrow.png" alt=""/>Назад
                </button>
            </div>
            {data.is_owner
            ?
                <div>
                    <button>Редактировать</button>
                    <button>Удалить</button>
                </div>
             :
                <div className={styles.social_block}>
                    <div  className={styles.social_block_item}>
                        <a href="#">
                            <img src={'/icons/telegram-detail.png'} alt="#"/>
                        </a>
                    </div>
                    <div  className={styles.social_block_item}>
                        <a href="#">
                            <img src={'/icons/wa-detail.png'} alt="#"/>
                        </a>
                    </div>
                    <div  className={styles.social_block_item}>
                        <a href="#">
                            <img src={'/icons/instagram-detail.png'} alt="#"/>
                        </a>
                    </div>
                </div>
            }

        </div>
    )
}

export default Navigation;