import Category from "./Category/Category";
import styles from './styles.module.scss'
import useSWR from "swr";
import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import fetcher from "../../util/getFetcher";
import SearchPublication from "./Publications/Publications";

const Search = () => {
  const {data} = useSWR(uku + endpoints.categories, fetcher)

  return (
    <div className={styles.search}>
      <div className={styles.leftBox}>
        <div className={styles.category}>
          <h3>Категории</h3>
          <Category items={data}/>
        </div>
      </div>
      <SearchPublication/>
    </div>
  )
}

export default Search;