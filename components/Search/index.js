import Category from "./Category/Category";
import Publications from "./Publications/Publications";
import styles from './styles.module.scss'

const Search = () => {
    return (
        <div className={styles.search}>
            <Category/>
            <Publications/>
        </div>
    )
}

export default Search;