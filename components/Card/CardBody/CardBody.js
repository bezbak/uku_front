import styles from './styles.module.scss'

const CardBody = ({categories, description}) => {
  return (
    <div className={styles.cardBody}>
      <div className={styles.category}>
        {categories.length > 120 ? categories.slice(0, 120) + "..." : categories}
      </div>
      <div className={styles.description}>
        {description.length > 100 ? description.slice(0, 100).trim() + "..." : description}
      </div>
    </div>
  )
}

export default CardBody;