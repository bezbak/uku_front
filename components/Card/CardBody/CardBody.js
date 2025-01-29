import styles from './styles.module.scss'

const CardBody = ({categories, description}) => {
  return (
    <div className={styles.cardBody}>
      <div className={styles.category}>
        {categories.length > 120 ? categories.slice(0, 120).replaceAll(","," "+"/") + "..." : categories.replaceAll(",","/")}
      </div>
      <div className={styles.description}>
        <p>
          {description.length > 100 ? description.slice(0, 100).trim() + "..." : description}
        </p>
      </div>
    </div>
  )
}

export default CardBody;