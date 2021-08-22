import styles from './styles.module.scss'
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {commentState, modalDelete} from "./state";

const Navigation = () => {
    const [recoilState, setRecoilState] = useRecoilState(commentState)
    const [modalState, setModalState] = useRecoilState(modalDelete)
    const deleteItemHandler = (flag) => {
        setModalState(old=> ({...old, flag: flag}))
    }
    const router = useRouter()
    return (
        <div className={styles.navigation}>
            <div>
                <button
                    onClick={() => router.push("/")}
                    className={styles.navBack}><img src="/icons/leftArrow.png" alt=""/>Назад
                </button>
            </div>
            {recoilState.is_owner
            ?
                <div>
                    <button>Редактировать</button>
                    <button onClick={() => deleteItemHandler(true)}>Удалить</button>
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

