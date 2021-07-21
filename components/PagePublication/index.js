import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Button from "../Button";
import {actions} from "../../store/publication/slice";
import TelegramIcon from '../../public/icons/telegram.svg'
import WhatsAppIcon from '../../public/icons/whatsApp.svg'
import InstagramIcon from '../../public/icons/instagram.svg'
import ArrowRightIcon from '../../public/icons/backArrow.svg'
import LineIcon from '../../public/icons/line.svg'
import SelectImg from '../../public/icons/imgAddIcon.svg'
import SendMsgIcon from '../../public/icons/sendinMsg.svg'
import styles from './styles.module.scss'
import PublicationImgSlider from "../PublicationImgSlider";
import Container from "../../containers";
import NavLink from "../NavLink";
import ImagesSelectIcon from "../../public/icons/imgAddIcon.svg";
import classNames from "classnames";
import CloseIcon from "../../public/icons/CloseIcon.svg";

const ImageSelectInput = ({setSelectedImages}) => {
  const onChangeImg = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      // setImages(selectedImages => [...selectedImages, URL.createObjectURL(e.target.files[i])])
      setSelectedImages(selectedImages => [...selectedImages, URL.createObjectURL(e.target.files[i])])
    }
  }
  return (
    <label className={styles.pagePublication__addComment__selectImg}>
      <ImagesSelectIcon/>
      <input type="file"
             style={{visibility: 'hidden'}}
             onChange={onChangeImg}
             className={styles.pagePublication__addComment__selectImg_input}
             multiple
      />
    </label>
  )
}
const PagePublication = () => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([])
  const [closeNComment, setCloseNComment] = useState(false)
  const [showNComment, setShowNComment] = useState(true)
  const [isSelectedImages, setIsSelectedImages] = useState(false)
  const publication_id = useSelector((store) => store.publication.publication_id, shallowEqual);
  const getPublicationInfoRequest = (payload) => dispatch(actions.getPublicationInfoRequestStart(payload));
  useEffect(() => {
    getPublicationInfoRequest(publication_id)
  }, [publication_id])
  const publicationInfo = useSelector((store) => store.publication.publicationInfo, shallowEqual);
  const getReplyComment = () => {
    setCloseNComment(true)
    setShowNComment(false)
  }
  const addComment = (values) =>{
    console.log(values)
  }

  return (
    <Container>
      <div className={styles.pagePublication}>
        <div className={styles.pagePublication__header}>
          <Button>
            <ArrowRightIcon/>
            Назад
          </Button>
          <div className={styles.pagePublication__header__socialButtonAddress}>
            <NavLink><TelegramIcon/></NavLink>
            <NavLink><WhatsAppIcon/></NavLink>
            <NavLink><InstagramIcon/></NavLink>
          </div>
          <div className={styles.pagePublication__header_editButtons}>
            <Button>Редактировать</Button>
            <Button>Удалить</Button>
          </div>
        </div>
        <div className={styles.pagePublication__infoContent}>
          <div className={styles.pagePublication__infoContent_left}>
            <div className={styles.pagePublication__infoContent__userInfo}>
              <img src='images/avatar.png'/>
              <div className={styles.pagePublication__infoContent__userInfo__fioAndAddress}>
                <span>Фывова Александра</span>
                <span className={styles.pagePublication__infoContent__userInfo__fioAndAddress_address}>Россия, Москва, метро Черкизовская</span>
              </div>
            </div>
            <div>
              <PublicationImgSlider/>
            </div>
          </div>
          <div className={styles.pagePublication__infoContent_right}>
            <div className={styles.pagePublication__infoContent__category}>
              <span>Категория/ Подкатегория 1</span>
            </div>
            <div className={styles.pagePublication__infoContent__info}>
              <div v className={styles.pagePublication__infoContent__info_opisanie}>
              <span>
                Описание
              </span>
              </div>
              <div v className={styles.pagePublication__infoContent__info_description}>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tincidunt ac fames ut commodo ut orci ut id porta.
                Mi nisi nunc nunc gravida. Purus mauris sed eleifend nulla risus ipsum sit.
                Ac mauris ut faucibus etiam sed varius in maecenas tristique.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Tincidunt ac fames ut commodo
                ut orci ut id porta. Mi nisi nunc nunc gravida. Purus mauris sed eleifend nulla risus ipsum
              </span>
              </div>
            </div>
            <div className={styles.pagePublication__infoContent__comments}>
              <div className={styles.pagePublication__infoContent__comments_title}>
              <span>
                Комментарии
              </span>
              </div>
              <div className={styles.pagePublication__infoContent__commentsBox}>
                <div className={styles.pagePublication__infoContent__commentsBox__comment}>
                  <img src={'images/avatar.png'}/>
                  <div>
                    <div className={styles.pagePublication__infoContent__commentsBox__comment_info}>
                    <span className={styles.pagePublication__infoContent__commentsBox__comment_name}>
                    Фывова Александра
                    </span>
                      <span className={styles.pagePublication__infoContent__commentsBox__comment_text}>
                     Lorem ipsum dolor sit amet, consectetur ut ut ut adipiscing elit. Tincidunt ac fames ut commodo ut Lorem ipsum dolor sit amet, consectetur ut ut ut adipiscing elit. Tincidunt ac fames ut
                      </span>
                    </div>
                    <div className={styles.pagePublication__infoContent__commentsBox__comment_time}>
                    <span>
                      8 часов назад
                    </span>
                    </div>
                    <div className={styles.pagePublication__infoContent__commentsBox__comment_isAnswer}>
                      <Button className={styles.pagePublication__infoContent__commentsBox__comment_isAnswer}
                              textClassName={styles.pagePublication__infoContent__commentsBox__comment_isAnswer_text}
                      >
                        Ответить
                      </Button>
                    </div>

                    {closeNComment &&
                    <div className={styles.pagePublication__infoContent__commentsBox__comment}>
                      <img src={'images/avatar.png'}/>
                      <div>
                        <div className={styles.pagePublication__infoContent__commentsBox__comment_info}>
                    <span className={styles.pagePublication__infoContent__commentsBox__comment_name}>
                    Фывова Александра
                    </span>
                          <span className={styles.pagePublication__infoContent__commentsBox__comment_text}>
                      Lorem ipsum dolor sit amet, consectetur ut ut ut adipiscing elit. Tincidunt ac fames ut commodo ut Lorem ipsum dolor sit amet, consectetur ut ut ut adipiscing elit. Tincidunt ac fames ut
                      </span>
                        </div>
                        <span className={styles.pagePublication__infoContent__commentsBox__comment_time}>
                    <span>
                      8 часов назад
                    </span>
                          </span>
                        <Button className={styles.pagePublication__infoContent__commentsBox__comment_isAnswer}
                                textClassName={styles.pagePublication__infoContent__commentsBox__comment_isAnswer_text}
                        >
                          Ответить
                        </Button>
                        <Button className={styles.pagePublication__infoContent__commentsBox__comment_replyOpen}
                                textClassName={styles.pagePublication__infoContent__commentsBox__comment_replyOpen_text}
                                onClick={() => {
                                  setCloseNComment(false);
                                  setShowNComment(true)
                                }}
                        >
                          <LineIcon/> <span>Скрыть коментарии</span>
                        </Button>
                      </div>


                    </div>

                    }
                    {showNComment && <Button className={styles.pagePublication__infoContent__commentsBox__comment_replyOpen}
                             textClassName={styles.pagePublication__infoContent__commentsBox__comment_replyOpen_text}
                             onClick={getReplyComment}
                    >
                      <LineIcon/> <span>Показать N коментариев</span>
                    </Button>}
                  </div>
                </div>
              </div>

            </div>
            <div className={styles.pagePublication__addComment}>
              <div className={styles.pagePublication__addComment__selectImg}>
                <ImageSelectInput setSelectedImages={setSelectedImages}/>
              </div>
              {
                selectedImages?.map((file, index) => {
                  return (
                    <div
                      className={classNames(styles.pagePublication__addComment_selectedImg,
                        {[styles.pagePublication__addComment_selectedImg_close]: isSelectedImages})}>
                      <img src={file} key={index}/>
                      <CloseIcon onClick={() => {
                        setIsSelectedImages(true)
                      }}/>
                    </div>
                  )
                })
              }
              <div className={styles.pagePublication__addComment__comment}>
                <textarea placeholder={"Ваш коментарий"}
                          className={styles.pagePublication__addComment__comment_textarea}
                          
                />
              </div>
              <Button className={styles.pagePublication__addComment__sendButton}
                      onClick={addComment}
              >
                <SendMsgIcon/>
              </Button>

            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default PagePublication