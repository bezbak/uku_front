import Comment from "./Comment";
import CommentInput from "./CommentInput";
import styles from './styles.module.scss'

const DetailDescription = () => {
    return (
        <div className={styles.detailDesc}>
            <div className={styles.category}>
                <p>Категория/ Подкатегория 1</p>
            </div>
            <div className={styles.desc}>
                <h3>Описание</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda at consequatur cum dicta
                    eius facere harum iusto minima molestiae odit officia perspiciatis, quas, recusandae sit vel, vitae
                    voluptatum. Numquam!</p>
            </div>
            <div className={styles.comment}>
                <h3>Комментарии</h3>
                <Comment/>
            </div>
            <div>
                <CommentInput/>
            </div>
        </div>
    )
}

export default DetailDescription;