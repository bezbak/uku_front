import Comment from "./Comment";
import CommentInput from "./CommentInput";
import styles from './styles.module.scss'

const DetailDescription = ({category, description, comment}) => {
    return (
        <div className={styles.detailDesc}>
            <div className={styles.category}>
                <p>{category && category.name}</p>
            </div>
            <div className={styles.desc}>
                <h3>Описание</h3>
                <p>{description && description}</p>
            </div>
            <div className={styles.comment}>
                <h3>Комментарии</h3>
                <Comment comments={comment && comment}/>
            </div>
            <div>
                <CommentInput/>
            </div>
        </div>
    )
}

export default DetailDescription;