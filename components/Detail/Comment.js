import styles from './styles.module.scss'

const Comment = ({comments}) => {


    console.log(comments)

    return (
        <div className={styles.comments}>
            <img src="/images/noAvatar.png" width={"36px"} height={"36px"} alt=""/>
            <div className={styles.commentsData}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, deserunt distinctio est officiis quae
                    ullam vero. Assumenda esse ex expedita molestiae obcaecati, quas quidem quis sequi similique vel?
                    Commodi, veritatis?</p>
                <div>
                    <span className={styles.commentTime}>8 часов назад</span> <span
                    className={styles.answer}>Ответить</span>
                </div>
                <span className={styles.showComments}>
                    Показать все N комментариев
                </span>
            </div>
        </div>
    )
}

export default Comment;