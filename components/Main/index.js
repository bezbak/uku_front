import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import Cookie from "js-cookie";
import Card from "../Card";
import {actions} from "../../store/profile/slice";
import styles from './styles.module.scss'

const Main = ({title = "Лента"}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const userFeed = useSelector((store) => store.profile.feed, shallowEqual);
  const userPublicationFeed = useSelector((store) => store.profile.feedPublication, shallowEqual);
  // const [userPublicationFeed, setUserPublicationFeed] = useState([]);
  const accountProfile = (id )=> {
    console.log(id)
  }
  const is_profile_completed = Cookie.get("is_profile_completed")
  const feedRequest = (page) => dispatch(actions.feedRequestStart(page));
  const updateFeed = (changedFeed) => dispatch(actions.updateFeed(changedFeed));
  const handleScroll = (event) => {
    const {scrollTop,clientHeight, scrollHeight} = event.currentTarget;
    console.log(scrollHeight- scrollTop === clientHeight)
    if (scrollHeight- scrollTop === clientHeight) {
      setPage(prev=>prev+1);
    }
  }
  useEffect(() => {
      setLoading(true);
      feedRequest(page)
      setLoading(false)
  }, [page])
  //
  // useEffect(() => {
  //   updateFeed(changedUserPublicationFeed);
  // }, [account])
  console.log(userPublicationFeed);
  return (
    <div className={styles.main} >
      <div className={styles.main__title}>
        <span>
          {title}
        </span>
      </div>
      {/*<InfiniteScroll  dataLength={410}*/}
      {/*                 next={()=>  setPage(page+1)}*/}
      {/*                 hasMore={true}*/}
      {/*                 loader={<h4>Loading...</h4>}>*/}
        <div className={styles.main__container}  onClick={handleScroll}>
          {is_profile_completed &&
          userPublicationFeed?.map(slide =>
            <Card slideData={slide}
                  userPublicationFeed={userPublicationFeed}
                  accountProfile={accountProfile}
                  key={slide.id} publication={false}/>
          )
          }
        </div>
      {/*</InfiniteScroll>*/}

    </div>
  )
}
export default Main;