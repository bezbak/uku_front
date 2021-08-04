import styles from './styles.module.scss'

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <input type="text" width={200}/>
        </div>
    )
}

export default SearchBar;