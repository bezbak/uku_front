import styles from "../CardBody/styles.module.scss";

const CardFooter = () => {
    return (
        <div>
            <div className={styles.comments}>
                Посмотреть все комментарии (1)
            </div>
            <div className={styles.info}>
                <div>
                    8 часов назад
                </div>
                <div>
                    <img src="/icons/eye.png" alt=""/>
                </div>
            </div>
        </div>
    )
}

export default CardFooter;