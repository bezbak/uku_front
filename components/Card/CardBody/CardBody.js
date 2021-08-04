import styles from './styles.module.scss'

const CardBody = () => {
    return (
        <div className={styles.cardBody}>
            <div className={styles.category}>
                Категория/Подкатегория
            </div>
            <div className={styles.description}>
                В бизнес комплекс срочно требуется уборщицы за наличку
            </div>
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

export default CardBody;