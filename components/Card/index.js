import React, {useState} from "react";
import {useDispatch} from "react-redux";
import SwiperCard from "../Swiper";
import Button from "../Button";
import Modal from "../UI/Modal";
import pathnames from "../../constants/pathnames";
import {actions} from "../../store/profile/slice";

import EyeIcon from '../../public/icons/eye.svg'
import EditIcon from '../../public/icons/Edit.svg'
import DeleteIcon from '../../public/icons/CloseIcon.svg'
import styles from './styls.module.scss'

const Card = ({slideData, publication, setToEditPublicationId, setEditPublication}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idPublication, setIdPublication] = useState(false)

  const [userId, setUserId] = useState();
  const AskToDeletePublication = (idPublication) => {
    setIsModalOpen(true)
    setIdPublication(idPublication)
  }
  const DeletePublication = (payload) => dispatch(actions.deletePublicationRequestStart(payload));
  const DeleteUserPublication = (idPublication) => {
    return new Promise((resolve) => {
      DeletePublication({
        idPublication,
        callback: (response) => {
          if (!response) {
            push(pathnames.registration);
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
  }
  return (
    <>
      <div className={styles.card} onClick={() => setIdPublication(slideData.id)}>
        {!publication &&
        <div className={styles.card__headline} onClick={() => setUserId(slideData.user?.id)}>
          <img src="icons/avatar.png"/>
          <div className={styles.card__headline__info}>
            <span
              className={styles.card__headline__info_name}>{slideData?.user?.first_name} {slideData?.user?.last_name}</span>
            {slideData?.user?.address &&
            <span className={styles.card__headline__info_address}>{slideData?.user?.address}</span>}
          </div>
          <div className={styles.card__headline__follow}>
          <span>
            Подписаться
          </span>
          </div>
        </div>}
        {publication && <div className={styles.userPublication}>
          <Button className={styles.userPublication__edit} onClick={() => callEditContent(slideData.id)}>
            <EditIcon/>
          </Button>
          <Button className={styles.userPublication__delete} onClick={() => AskToDeletePublication(slideData.id)}>
            <DeleteIcon/>
          </Button>
        </div>}
        <SwiperCard data={slideData?.images}/>
        <div className={styles.card__footer}>
          <div className={styles.card__footer__category}>
            <span>Категория/ {slideData?.categories}</span>
          </div>
          <div className={styles.card__footer__description}>
          <span>
           {slideData?.description}
          </span>
          </div>
          <div className={styles.card__footer__commentary}>
          <span>
            Посмотреть все комментарии ({slideData?.comment_count})
          </span>
          </div>
          <div className={styles.card__footer__timeAndView}>
          <span className={styles.card__footer__timeAndView_time}>
            {slideData?.created_at} часов назад
          </span>
            <span className={styles.card__footer__timeAndView_view}>
           <EyeIcon/>{slideData.viewed}
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
                    onClick={() => DeleteUserPublication(idPublication)}
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