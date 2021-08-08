import styles from "../CardBody/styles.module.scss";

const CardFooter = ({created_at, comment_count}) => {
    return (
        <div>
            <div className={styles.comments}>
                {comment_count ? `Посмотреть все комментарии (${comment_count})` : null}
            </div>
            <div className={styles.info}>
                <div>
                    {created_at}
                </div>
                <div>
                    <img src="/icons/eye.png" alt=""/>
                </div>
            </div>
        </div>
    )
}

export default CardFooter;