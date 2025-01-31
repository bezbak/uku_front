import styles from './styles.module.scss'
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {detailPublicationState, modalStateFlag} from "./state";
import {useMediaQuery} from "react-responsive";

const Navigation = () => {
  const [recoilState] = useRecoilState(detailPublicationState)
  const [, setModalState] = useRecoilState(modalStateFlag)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const showModalHandler = (key, flag) => {
    setModalState(old => ({...old, [key]: flag}))
  }

  const router = useRouter()
  return (
    <div className={styles.navigation}>
      <div>
        <button
          onClick={() => router.push("/")}
          className={styles.navBack}><img src="/icons/leftArrow.png" alt="#"/>Назад
        </button>
      </div>
      {recoilState.is_owner
        ?
        isDesktopOrLaptop &&
        <div>
          <button onClick={() => showModalHandler("updateModal", true)}>Редактировать</button>
          <button onClick={() => showModalHandler("deletePublicationModal", true)}>Удалить</button>
        </div>
        :
        <div className={styles.social_block}>
          <div className={styles.social_block_item}>
            <a href="#">
              <img src={'/icons/telegram-detail.png'} alt="#"/>
            </a>
          </div>
          <div className={styles.social_block_item}>
            <a href="#">
              <img src={'/icons/wa-detail.png'} alt="#"/>
            </a>
          </div>
          <div className={styles.social_block_item}>
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

