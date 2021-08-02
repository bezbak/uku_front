import React, {useCallback, useState} from "react";
import {useRouter} from "next/router";
import classNames from 'classnames'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions as accountAction} from "../../store/account/slice";
import {actions as publicationAction} from "../../store/publication/slice";
import styles from './styles.module.scss'
import pathnames from "../../constants/pathnames";

const AccountSearch = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpen, SetIsOpen] = useState(false);
    const accountSearchRef = React.useRef();

    const closeNavigationMenu = () => {
        SetIsOpen(!isOpen);
    }

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (accountSearchRef.current && !accountSearchRef.current.contains(event.target)) {
                closeNavigationMenu()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [accountSearchRef]);

    React.useEffect(() => {
        router.events.on('routeChangeStart', closeNavigationMenu);

        return () => {
            router.events.off('routeChangeStart', closeNavigationMenu);
        }
    }, []);


    const searchedAccountsList = useSelector((store) => store.account.searchedAccountsList, shallowEqual);

    const onSearchAccount = (e) => {
        SetIsOpen(false)
        const q = e.target.value

        if (q !== "") {
            setTimeout(() => {
                dispatch(accountAction.searchAccountRequestStart({q: q}));
            }, 300)
        }

    };

    const accountProfile = useCallback(
        (account) => {
            dispatch(accountAction.accountProfileRequestStart({id: account.id}));
            router.push({pathname: `${pathnames.accountProfile}/${account?.first_name}${account?.last_name}`})
        },
        []
    );


    return (
        <div className={styles.searchBody} ref={accountSearchRef} id='account-search'>
            <input type="text"
                   placeholder="Кого будем искать"
                   name="search"
                   onChange={onSearchAccount}
                   className={styles.search}/>
            {searchedAccountsList &&
            <div className={classNames(styles.searchResultBar, {[styles.searchResultBar_display]: isOpen})}>
                <ul className={styles.searchResultBar__list}>
                    {searchedAccountsList?.map((item) =>
                            <li className={styles.searchResultBar__list_item} key={item.id}
                                onClick={() => accountProfile(item)}>
                                <img src={item.avatar ? item.avatar : 'images/avatar.png'}
                                     className={styles.searchResultBar__list_item__avatar}/>
                                <div className={styles.searchResultBar__list_item__info}>
                                    <div className={styles.searchResultBar__list_item__info_fio}>
                  <span>
                    {item.first_name} {item.last_name}
                  </span>
                                    </div>
                                    <div className={styles.searchResultBar__list_item__info_phoneNumber}>
                  <span>
                  {item.phone}
                  </span>
                                    </div>
                                </div>

                            </li>
                    )}
                </ul>
            </div>
            }

        </div>
    )
}

const PublicationSearch = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [page, setPage] = useState(1)
    const [isOpen, SetIsOpen] = useState(false);
    const publicationSearchRef = React.useRef();


    const closeNavigationMenu = () => {
        SetIsOpen(!isOpen);
    }

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (publicationSearchRef.current && !publicationSearchRef.current.contains(event.target)) {
                closeNavigationMenu()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [publicationSearchRef]);

    React.useEffect(() => {
        router.events.on('routeChangeStart', closeNavigationMenu);

        return () => {
            router.events.off('routeChangeStart', closeNavigationMenu);
        }
    }, []);

    const category_id = useSelector((store) => store.category.category_id, shallowEqual);
    const location_id = useSelector((store) => store.location.location_id, shallowEqual);
    const searchedPublicationList = useSelector((store) => store.publication.searchedPublicationList, shallowEqual);

    const onSearchPublication = (e) => {
        SetIsOpen(false)
        const q = e.target.value;
        setTimeout(() => {
            dispatch(publicationAction.searchPublicationRequestStart({
                page: page,
                q: q,
                category_id: category_id,
                location_id: location_id
            }));
        }, 2000)

    };


    const publicationInfo = (id) => {
        dispatch(publicationAction.setPublicationId(id))
        setTimeout(() => {
            router.push({pathname: `${pathnames.publicationInfo}/${id}`})
        }, 1000)
    };

    return (
        <div ref={publicationSearchRef} id="publication-search">
            <input type="text"
                   placeholder="Введите название объявления"
                   name="search"
                   onChange={onSearchPublication}
                   className={styles.search}/>
            {searchedPublicationList.results &&
            <div className={classNames(styles.searchResultBar, {[styles.searchResultBar_display]: isOpen})}>
                <ul className={styles.searchResultBar__list}>
                    {searchedPublicationList.results?.map((item) =>
                            <li className={styles.searchResultBar__list_item} key={item.id}
                                onClick={() => publicationInfo(item.id)}>
                                <div className={styles.searchResultBar__list_item__info}>
                                    <div className={styles.searchResultBar__list_item__info__publicationInfo}>
                  <span>
                    {item.title}
                  </span>
                                    </div>
                                </div>

                            </li>
                    )}
                </ul>
            </div>
            }

        </div>
    )
}

const Search = ({title}) => {
    const route = useRouter();
    if (route.pathname === "/") return <AccountSearch/>
    else return <PublicationSearch/>

}

export default Search;