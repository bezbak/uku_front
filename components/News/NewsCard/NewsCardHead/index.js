import styles from './styles.module.scss'
import {useRouter} from "next/router";

const NewsCardHead = ({user, image}) => {

  const router = useRouter()

  const onClickAuthor = () => {
    router.push(`/profile/${user.id}`)
  }
  return (
    <div onClick={onClickAuthor} className={styles.newsCardHead}>
      <img src={image[0] ? image[0].image : '/images/noAvatar.png'} alt=""/>
      <p>{user.last_name + " " + user.first_name}</p>
    </div>
  )
}

export default NewsCardHead;