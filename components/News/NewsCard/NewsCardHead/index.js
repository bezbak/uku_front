import styles from './styles.module.scss'

const NewsCardHead = ({user, image}) => {
  console.log(user)
  return (
    <div className={styles.newsCardHead}>
      <img src={image[0] ? image[0].image : '/images/noAvatar.png'} alt=""/>
      <p>{user.last_name + " " + user.first_name}</p>
    </div>
  )
}

export default NewsCardHead;