import React, {useCallback, useState} from "react";
import {useRouter} from "next/router";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import SwiperCard from "../Swiper";
import Button from "../Button";
import Modal from "../UI/Modal";
import pathnames from "../../constants/pathnames";

import {actions} from "../../store/profile/slice";
import {actions as accountAction} from '../../store/account/slice'
import {actions as publicationAction} from '../../store/publication/slice'
import EyeIcon from '../../public/icons/eye.svg'
import EditIcon from '../../public/icons/Edit.svg'
import DeleteIcon from '../../public/icons/CloseIcon.svg'
import styles from './styls.module.scss'

const Card = ({
                  slideData,
                  userPublicationFeed,
                  profileCard,
                  publication,
                  setToEditPublicationId,
                  setEditPublication
              }) => {
    const dispatch = useDispatch();
    const route = useRouter();
    const avatar = slideData?.user?.avatar ? slideData.user?.avatar : "icons/avatar.png";
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userId, setUserId] = useState(slideData?.user?.id);
    const [idPublication, setIdPublication] = useState(slideData?.id)
    const account = useSelector((store) => store.account, shallowEqual);
    const [isSubscribe, setIsSubscribe] = useState(slideData?.user?.id === account.id ? account.subscribe : slideData?.user?.following)

    const askToDeletePublication = () => {
        setIsModalOpen(true)
    }

    const accountProfile = useCallback(
        () => {
            dispatch(accountAction.accountProfileRequestStart({id: userId}));
            route.push({pathname: `${pathnames.accountProfile}/${slideData?.user?.first_name}`})
        },
        []
    );

    const publicationInfo = (id) => {
        dispatch(publicationAction.setPublicationId(idPublication))
        setTimeout(() => {
            route.push({pathname: `${pathnames.publicationInfo}/${slideData?.id}`})
        }, 1000)
    };

    const getPublicationInfoRequest = (payload) => dispatch(actions.getPublicationInfoRequestStart(payload));
    const deletePublication = (payload) => dispatch(publicationAction.deletePublicationRequestStart(payload));

    const deleteUserPublication = () => {
        setIsModalOpen(false)
        return new Promise((resolve) => {
            deletePublication({
                id: idPublication,
                callback: (response) => {
                    if (!response) {
                        route.push(pathnames.profile);
                    } else {
                        resolve(response);
                    }
                }
            });
        })
    }

    const callEditContent = (id) => {
        setToEditPublicationId(id);
        setEditPublication(true)
        setIsModalOpen(true)
        setIdPublication(id)
    }

    const accountFollow = (id) => {
        const changedUserPublicationFeed = userPublicationFeed
        dispatch(accountAction.accountFollowRequestStart({id, changedUserPublicationFeed}));
        setIsSubscribe(slideData?.user.id === account.id ? account.subscribe : isSubscribe)
    };
    return (
        <>
            <div className={styles.card}>
                {!publication && !profileCard &&
                <div className={styles.card__headline}>
                    <div className={styles.cardProfile}>
                        <img src={avatar} alt="avatar"/>
                        <div className={styles.card__headline__info} onClick={accountProfile}>
                            <span
                                className={styles.card__headline__info_name}>
                              {slideData?.user?.first_name.slice(0, 10)} {slideData?.user?.firstName?.length > 10 ? "..." : ""}
                                {slideData?.user?.last_name.slice(0, 5)} {slideData?.user?.last_name?.length > 5 ? "..." : ""}
                            </span>
                            {slideData?.user?.location &&
                            <span className={styles.card__headline__info_address}>{slideData?.user?.location}</span>}
                        </div>
                    </div>


                    <Button className={styles.card__headline__follow} textClassName={styles.card__headline__follow_text}
                            onClick={() => accountFollow(slideData?.user.id)}>
                        {(slideData?.user?.id === account.id ? account.subscribe : isSubscribe) ?
                            <span className={styles.followed}>Вы подписаны</span> : <span>Подписаться</span>}
                    </Button>
                </div>}
                <SwiperCard data={slideData} onClick={() => publicationInfo(slideData.id)}/>
                <div className={styles.card__footer} onClick={() => publicationInfo(slideData.id)}>
                    <div className={styles.card__footer__category}>
                        <span>Категория/ {slideData?.categories}</span>
                    </div>
                    <div className={styles.card__footer__description}>
          <span>
           {slideData?.description.slice(0, 100)}{slideData?.description.length > 100 ? "..." : ""}
          </span>
                    </div>
                    <div className={styles.card__footer__commentary}>
          <span>
              {slideData?.comment_count !== 0 ? "Посмотреть все комментарии" + " " + `(${slideData?.comment_count})` : null}
          </span>
                    </div>
                    <div className={styles.card__footer__timeAndView}>
          <span className={styles.card__footer__timeAndView_time}>
            {slideData?.created_at}           </span>
                        <span className={styles.card__footer__timeAndView_view}>
           <EyeIcon/>
                            <span className={styles.viewCounter}>
                                {slideData.viewed}
                            </span>
          </span>
                    </div>

                </div>

            </div>

            <Modal modalOpen={isModalOpen}>
                <div className={styles.modal}>
                    <div className={styles.modal__title}>
            <span>
             Вы действительно хотите удалить объявление?
            </span>
                    </div>
                    <div className={styles.modal_buttons}>
                        <Button className={styles.modal__changeButton}
                                textClassName={styles.modal__changeButton_text}
                                onClick={() => deleteUserPublication(idPublication)}
                        >
                            Удалить
                        </Button>
                        <Button className={styles.modal__cancelButton}
                                textClassName={styles.modal__cancelButton_text}
                                onClick={() => setIsModalOpen(false)}
                        >Отмена</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Card;