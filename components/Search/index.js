import React, {useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions as accountAction} from "../../store/account/slice";
import {actions as publicationAction} from "../../store/publication/slice";
import {useRouter} from "next/router";
import styles from './styles.module.scss'

const AccountSearch = () => {
  const dispatch = useDispatch();

  const result = useSelector((store) => store.account.searchedAccountsList, shallowEqual);
  const onSubmit = (e) => {
    const q= e.target.value
    setTimeout(() => {
      dispatch(accountAction.searchAccountRequestStart({q: q}));
    }, 2000)
    console.log(e.target.value)

  };
console.log(result)

  return (
    <div>
      <input type="text"
             placeholder="Кого будем искать"
             name="search"
             onChange={onSubmit}
             className={styles.search}/>
      <div className={styles.searchResultBar}>
        <ul  className={styles.searchResultBar}>
          {result?.map((item)=>
            <li  className={styles.searchResultBar__list_item}>
              {console.log(item.avatar)}
              <img src={item.avatar} className={styles.searchResultBar__list_item_avatar}/>
              <div className={styles.searchResultBar__list_item_info}>
                <div className={styles.searchResultBar__list_item_fio}>
                  <span>
                    {item.first_name} {item.last_name}
                  </span>
                </div>
                <div className={styles.searchResultBar__list_item_phoneNumber}>
                  <span>
                  {item.phone}
                  </span>
                </div>
              </div>

            </li>
          )}
        </ul>
      </div>

    </div>
  )
}

const PublicationSearch = () => {
  const dispatch = useDispatch();
  const [page,setPage] = useState(1)
  const result = useSelector((store) => store.publication.searchedPublicationInfo, shallowEqual);
  const category_id = useSelector((store) => store.category.category_id, shallowEqual);
  const location_id = useSelector((store) => store.location.location_id, shallowEqual);
  const onSubmit = (e) => {
    const q= e.target.value
    setTimeout(() => {
      dispatch(publicationAction.searchPublicationRequestStart({page:page,q: q,category_id:6,location_id:17}));
    }, 2000)
    console.log(e.target.value)

  };
  console.log(result)

  return (
    <div>
      <input type="text"
             placeholder="Кого будем искать"
             name="search"
             onChange={onSubmit}
             className={styles.search}/>
      <div className={styles.searchResultBar}>
        <ul  className={styles.searchResultBar}>
          {result?.results?.map((item)=>
            <li  className={styles.searchResultBar__list_item}>
                <div className={styles.searchResultBar__list_item_fio}>
                  <span>
                    {item.description}
                  </span>
                </div>
            </li>
          )}
        </ul>
      </div>

    </div>
  )
}

const Search = () => {
  const route = useRouter();
  if (route.pathname==="/") return <AccountSearch/>
  else return <PublicationSearch/>

}

export default Search;