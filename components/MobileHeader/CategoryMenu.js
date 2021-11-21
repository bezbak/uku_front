import React from 'react';
import styles from "./styles.module.scss";
import Link from "next/link";
import Category from "../Search/Category/Category";
import useSWR from "swr";
import uku from "../../util/HTTP_Agent";
import {endpoints} from "../../api/endpoints";
import fetcher from "../../util/getFetcher";
import categoryStyles from './categoryStyles.module.scss'

function CategoryMenu() {
  const {data} = useSWR(uku + endpoints.categories, fetcher)

  return (
    <ul className={categoryStyles.menu}>
      <Category items={data}/>
    </ul>
  );
}

export default CategoryMenu;