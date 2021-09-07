import Category from "./Category/Category";
import Publications from "./Publications/Publications";
import styles from './styles.module.scss'
import useSWR from "swr";
import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import fetcher from "../../util/getFetcher";
import Modal from "../UI/Modal/Modal";
import {useRecoilState} from "recoil";
import {modalAtom} from "./state";
import CreatePublication from "../CreatePublication";

const Search = ({createPublication = false}) => {
  const {data, error} = useSWR(uku + endpoints.categories, fetcher)
  const [modal, setModal] = useRecoilState(modalAtom)

  return (
    <div className={styles.search}>
      <Category items={data}/>
      {createPublication ? <CreatePublication/> : <Publications/>}
      <Modal
        title={"Выберите город"}
        modal={modal}
        setModal={setModal}
      />
    </div>
  )
}

export default Search;