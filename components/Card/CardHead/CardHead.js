import styles from './styles.module.scss'

const CardHead = () => {
    return (
        <div className={styles.cardHead}>
            <div  className={styles.cardName}>
                <img src="/images/cardAvatar.png" alt=""/>
                <div>
                    <p>Фывова Александра</p>
                    <span>Москва</span>
                </div>
            </div>
            <p>Подписаться</p>
        </div>
    )
}

export default CardHead;