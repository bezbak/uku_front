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
  const [addCommentText, setAddCommentText] = useState([])
  const [reply, setReply] = useState(false)
  const [closeNComment, setCloseNComment] = useState(false)
  const [commentsAuthorID, setCommentAuthorID] = useState()
  const [showNComment, setShowNComment] = useState(true)
  const [isSelectedImages, setIsSelectedImages] = useState(false)
  const publication_id = useSelector((store) => store.publication.publication_id, shallowEqual);
  const getPublicationInfoRequest = (payload) => dispatch(actions.getPublicationInfoRequestStart(payload));
  const addCommentPublicationRequest = (payload) => dispatch(actions.addCommentPublicationRequestStart(payload));
  const replyCommentPublicationRequest = (payload) => dispatch(actions.replyCommentPublicationRequestStart(payload));
  useEffect(() => {
    getPublicationInfoRequest(publication_id)
  }, [publication_id])
  const publicationInfo = useSelector((store) => store.publication.publicationInfo, shallowEqual);
  const getReplyComment = () => {
    setCloseNComment(true)
    setShowNComment(false)
  }
  const handleChange = (e) => {
    setAddCommentText(e.target.value)
  }
  const addComment = (values) => {
    addCommentPublicationRequest({publication_id, addCommentText, selectedImages})
    console.log('publication_id' + publication_id)
  }
  const addReplyComment = (values) => {
    console.log("commentsAuthorID" + commentsAuthorID)
    console.log('publication_id' + publication_id)
    replyCommentPublicationRequest({publication_id, commentsAuthorID,addCommentText, selectedImages})

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
            <NavLink url={publicationInfo?.user?.telegram}><TelegramIcon/></NavLink>
            <NavLink url={publicationInfo?.user?.whatsapp}><WhatsAppIcon/></NavLink>
            <NavLink url={publicationInfo?.user?.instagram}><InstagramIcon/></NavLink>
          </div>
          <div className={styles.pagePublication__header_editButtons}>
            <Button>Редактировать</Button>
            <Button>Удалить</Button>
          </div>
        </div>
        <div className={styles.pagePublication__infoContent}>
          <div className={styles.pagePublication__infoContent_left}>
            <div className={styles.pagePublication__infoContent__userInfo}>
              <img src={publicationInfo?.user?.avatar}/>
              <div className={styles.pagePublication__infoContent__userInfo__fioAndAddress}>
                <span>{publicationInfo?.user?.first_name} {publicationInfo?.user?.last_name}</span>
                <span
                  className={styles.pagePublication__infoContent__userInfo__fioAndAddress_address}>{publicationInfo?.location?.name}</span>
              </div>
            </div>
            <div>
              <PublicationImgSlider/>
            </div>
          </div>
          <div className={styles.pagePublication__infoContent_right}>
            <div className={styles.pagePublication__infoContent__category}>
              <span>Категория/{publicationInfo?.category?.name}</span>
            </div>
            <div className={styles.pagePublication__infoContent__info}>
              <div className={styles.pagePublication__infoContent__info_opisanie}>
              <span>
                Описание
              </span>
              </div>
              <div className={styles.pagePublication__infoContent__info_description}>
              <span>
               {publicationInfo?.description}
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
                {
                  publicationInfo?.comments?.map((comment) => {
                    return (
                      <div className={styles.pagePublication__infoContent__commentsBox__comment} key={comment.id}>
                        <img src={comment.author.avatar}/>
                        <div>
                          <div className={styles.pagePublication__infoContent__commentsBox__comment_info}>
                    <span className={styles.pagePublication__infoContent__commentsBox__comment_name}>
                      {comment.author.first_name} {comment.author.last_name}
                    </span>
                            <span className={styles.pagePublication__infoContent__commentsBox__comment_text}>
                              {comment.text}
                            </span>
                          </div>
                          <div className={styles.pagePublication__infoContent__commentsBox__comment_time}>
                    <span>
                      {comment?.created_at}
                    </span>
                          </div>
                          <div className={styles.pagePublication__infoContent__commentsBox__comment_isAnswer}>
                            <Button className={styles.pagePublication__infoContent__commentsBox__comment_isAnswer}
                                    textClassName={styles.pagePublication__infoContent__commentsBox__comment_isAnswer_text}
                                    onClick={() => {
                                      setReply(true)
                                      setCommentAuthorID(comment.id)
                                    }}
                            >
                              Ответить
                            </Button>
                          </div>

                          {closeNComment && comment?.replies &&
                          comment?.replies?.map((replyComment) => {
                            return (
                              <div className={styles.pagePublication__infoContent__commentsBox__comment}>
                                <img src={replyComment.author.avatar}/>
                                <div>
                                  <div className={styles.pagePublication__infoContent__commentsBox__comment_info}>
                                     <span className={styles.pagePublication__infoContent__commentsBox__comment_name}>
                                  @{replyComment.reply_to_user.first_name} {replyComment.reply_to_user.last_name}
                                </span>
                                    <span className={styles.pagePublication__infoContent__commentsBox__comment_name}>
                                  {replyComment.author.first_name} {replyComment.author.last_name}
                                </span>
                                    <span className={styles.pagePublication__infoContent__commentsBox__comment_text}>{
                                      replyComment.text
                                    } </span>
                                  </div>
                                  <span className={styles.pagePublication__infoContent__commentsBox__comment_time}>
                                <span>
                                  {replyComment.created_at}
                                </span>
                              </span>
                                  <Button className={styles.pagePublication__infoContent__commentsBox__comment_isAnswer}
                                          textClassName={styles.pagePublication__infoContent__commentsBox__comment_isAnswer_text}
                                          onClick={() => setCommentAuthorID(comment.id)}
                                  >
                                    Ответить
                                  </Button>
                                  <Button
                                    className={styles.pagePublication__infoContent__commentsBox__comment_replyOpen}
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
                            )
                          })

                          }
                          {showNComment && comment.replies.length > 0 &&
                          <Button className={styles.pagePublication__infoContent__commentsBox__comment_replyOpen}
                                  textClassName={styles.pagePublication__infoContent__commentsBox__comment_replyOpen_text}
                                  onClick={getReplyComment}
                          >
                            <LineIcon/> <span>Показать N коментариев</span>
                          </Button>}
                        </div>
                      </div>
                    )
                  })
                }
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
                          cols="40" rows="3"
                          onChange={handleChange}
                          className={styles.pagePublication__addComment__comment_textarea}

                />
              </div>
              <Button className={styles.pagePublication__addComment__sendButton}
                      onClick={reply ? addReplyComment : addComment}
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