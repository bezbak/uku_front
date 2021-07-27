import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Cookie from "js-cookie";
import Card from "../Card";
import {actions} from "../../store/profile/slice";
import styles from './styles.module.scss'


const Main = ({title = "Лента"}) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const userPublicationFeed = useSelector((store) => store.profile.feedPublication, shallowEqual);
    const maxPage = useSelector((store) => store.profile.count, shallowEqual);
    // const is_profile_completed = Cookie.get("is_profile_completed")

    const feedRequest = (page) => dispatch(actions.feedRequestStart(page));

    const handleScroll = (event) => {
        const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
        if ((scrollTop + clientHeight > scrollHeight - 1) && (maxPage / 12) >= page) {
            setPage(prev => prev + 1);
        }
    }

    useEffect(() => {
        setLoading(true);
        feedRequest(page)
        setLoading(false)
    }, [page])
    console.log(userPublicationFeed)

    return (
        <div className={styles.main}>
            <div className={styles.main__title}>
        <span>
          {title}
        </span>
            </div>
            <div className={styles.main__container} onScroll={handleScroll}>
                {userPublicationFeed?.map((slide, index) =>
                    <div key={index}>
                        <Card slideData={slide}
                              userPublicationFeed={userPublicationFeed}
                              key={slide.id} publication={false}/>
                    </div>
                )
                }
            </div>
            {loading && <h4>Loading...</h4>}
        </div>
    )
}
export default Main;