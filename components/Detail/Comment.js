import styles from './styles.module.scss'
import {useState} from "react";

const Comment = ({comments,handleSelectedOptions,showMoreHandler,selectedOption}) => {
    return (
        <>
            {comments && comments.map(item => {
                return(
                    <div className={styles.comments} key={item.id}>
                        <img src={`http://api.uku.kg/` + item.author.avatar} className={styles.avatar} alt="#"/>
                        <div className={styles.commentsData}>
                            <p>
                                <span>{item.author.first_name}  {item.author.last_name}</span>
                                {item.text}
                            </p>
                            {item.image !== null ? <img src={`http://api.uku.kg/` + item.image} alt="#" className={styles.imagesInComment}/> : null}
                            <div className={styles.info_times}>
                                <span className={styles.commentTime}>{item.created_at}</span>
                                <span
                                    className={styles.answer}
                                    onClick={()=>handleSelectedOptions("answer",item.id, (`@${item.author.first_name}_${item.author.last_name}`))}>
                                        Ответить
                                </span>
                            </div>
                            {selectedOption.showMore ?
                                item.replies.map(item => {
                                    console.log(item,'pod')
                                    return(
                                        <div className={styles.comments} key={item.id}>
                                            <img src={`http://api.uku.kg/` + item.reply_to_user.avatar} className={styles.avatar} alt="#" width={'10px'}/>
                                            <div className={styles.commentsData}>
                                                <p>
                                                    <span>{item.reply_to_user.first_name}  {item.reply_to_user.last_name}</span>
                                                    {item.text}
                                                </p>
                                                {item.image !== null ? <img src="/images/Rectangle 44.jpg" alt="#" className={styles.imagesInComment}/> : null}
                                                <div className={styles.info_times}>
                                                    <span className={styles.commentTime}>{item.created_at}</span>
                                                    {/*
                                                     <span
                                                        className={styles.answer}
                                                        onClick={()=>handleSelectedOptions("answer",item.id, (`@${item.reply_to_user.first_name}_${item.reply_to_user.last_name}`))}>
                                                            Ответить
                                                    </span>
                                                    */}
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
                                    onClick={()=>showMoreHandler("showMore")}>
                                     ---- {selectedOption.showMore ? "Скрыть" : "Показать"} все {item.replies.length } комментариев
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