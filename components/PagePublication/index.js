import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/publication/slice";
import styles from './styles.module.scss'


const PagePublication = () => {
  const dispatch = useDispatch();
  const publication_id = useSelector((store) => store.publication.publication_id, shallowEqual);
  const getPublicationInfoRequest = (payload) => dispatch(actions.getPublicationInfoRequestStart(payload));
  useEffect(()=>{
    getPublicationInfoRequest(publication_id)
  }, [publication_id])
  const publicationInfo = useSelector((store) => store.publication.publicationInfo, shallowEqual);
  return (
    <div>

    </div>
  )
}
export default PagePublication