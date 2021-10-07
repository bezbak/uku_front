import {Header} from "../containers/header";
import CreatePublication from "../components/CreatePublication";
import Category from "../components/Search/Category/Category";
import classNames from "classnames";
import styles from '../containers/styles.module.scss'
import useSWR from "swr";
import uku from "../util/HTTP_Agent";
import {endpoints} from "../api/endpoints";
import fetcher from "../util/getFetcher";

const CreatePublicationPage = () => {
  const {data} = useSWR(uku + endpoints.categories, fetcher)

  return (
    <div>
      <Header/>
      <div className={classNames("container", styles.createPublicationPage)}>
        <Category items={data}/>
        <CreatePublication/>
      </div>
    </div>
  )
}

export default CreatePublicationPage;