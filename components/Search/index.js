import Category from "./Category/Category";
import Publications from "./Publications/Publications";
import styles from './styles.module.scss'
import useSWR from "swr";
import uku from "../../adapters/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import fetcher from "../../adapters/getFetcher";

const Search = () => {

    const {data, error} = useSWR(uku + endpoints.categories, fetcher)


    return (
        <div className={styles.search}>
            <Category items={data}/>
            <Publications/>
        </div>
    )
}

export default Search;