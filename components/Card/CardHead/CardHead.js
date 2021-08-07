import styles from './styles.module.scss'

const CardHead = ({user}) => {

    return (
        <div className={styles.cardHead}>
            <div className={styles.cardName}>
                <img src={user && user.avatar} alt=""/>
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