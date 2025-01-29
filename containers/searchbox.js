import Search from "../components/Search";
import classNames from "classnames";
import styles from './styles.module.scss'

const Searchbox = () => {

  return (
    <div className={classNames('container', styles.search)}>
      <Search/>
    </div>
  )
}

export default Searchbox;