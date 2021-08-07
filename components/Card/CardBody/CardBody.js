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
        </div>
    )
}

export default CardBody;