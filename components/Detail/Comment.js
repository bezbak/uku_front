import styles from './styles.module.scss'
import Link from "next/link";

const Comment = ({handleSelectedOptions, showMoreHandler, selectedOption, comments}) => {
    return (
        <>
            {comments?.map(item => {
                    return (
                        <div className={styles.comments} key={item.id}>
                            <img src={item.author.avatar} className={styles.avatar} alt="#"/>
                            <div className={styles.commentsData}>
                                <p>
                                    <Link href={`/profile/${item.author.id}`}>
                                        <a>
                                            <span>{item.author.first_name} {item.author.last_name}</span>
                                        </a>
                                    </Link>
                                    {item.text}
                                </p>
                                {item.image !== null ?
                                    <img src={item.image} alt="#" className={styles.imagesInComment}/> : null}
                                <div className={styles.info_times}>
                                    <span className={styles.commentTime}>{item.created_at}</span>
                                    <span
                                        className={styles.answer}
                                        onClick={() => handleSelectedOptions("answer", item.id, (`@${item.author.first_name}_${item.author.last_name}`))}>
                                        Ответить
                                </span>
                                </div>
                                {selectedOption.showMore && selectedOption.showMoreId === item.id ?
                                    item.replies.map(item => {
                                        return (
                                            <div className={styles.comments} key={item.id}>
                                                <img src={item.author.avatar} className={styles.avatar} alt="#"
                                                     width={'10px'}/>
                                                <div className={styles.commentsData}>
                                                    <p>
                                                        <Link href={`/profile/${item.author.id}`}>
                                                            <a>
                                                                <span>{item.author.first_name} {item.author.last_name}</span>
                                                            </a>
                                                        </Link>
                                                        {item.text}
                                                    </p>
                                                    {item.image !== null ? <img src={item.image} alt="#"
                                                                                className={styles.imagesInComment}/> : null}
                                                    <div className={styles.info_times}>
                                                        <span className={styles.commentTime}>{item.created_at}</span>
                                                        <span
                                                            className={styles.answer}
                                                            onClick={() => handleSelectedOptions("answer", item.id, `@${item.author.first_name}_${item.author.last_name}`)}>
                                                            Ответить
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                }
                                {
                                    item.replies.length !== 0
                                        ?
                                        <p className={styles.showComments}
                                           onClick={() => showMoreHandler("showMore", item.id)}>
                                            ---- {selectedOption.showMore && selectedOption.showMoreId === item.id ? "Скрыть" : "Показать"} все {item.replies.length} комментариев
                                        </p>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    )
                }
            )}
        </>

    )
}

export default Comment;