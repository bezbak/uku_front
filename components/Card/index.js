import styles from './styles.module.scss'
import CardHead from "./CardHead/CardHead";
import CardSlider from "./CardSlider/CardSlider";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";
import Link from "next/link";
import {onClickFavourite} from "./functions";
import Edit from '../../public/icons/Edit.svg'
import Delete from '../../public/icons/Delete.svg'
import HeartFill from '../../public/icons/HeartFill.svg'
import Heart from '../../public/icons/Heart.svg'
import {useState} from "react";
import ModalDeleteCard from "./ModalDeleteCard";
import {useRouter} from "next/router";

const Card = ({cards, width, setRecoilState, page = ""}) => {
  const [state, setState] = useState({
    modalDelete: false,
    loading: false,
  })
  const router = useRouter()

  if (!cards) return <div/>
  if (!cards.length) return <h3 className={styles.noContent}>Нет публикаций</h3>

  function onClickEdit(e, id) {
    e.stopPropagation()
    router.push({
      pathname: '/detail/[pid]',
      query: {pid: id, edit: true},
    })
  }

  function onClickDelete(e) {
    e.stopPropagation()
    e.preventDefault()
    setState(old => ({...old, modalDelete: !old.modalDelete}))
  }

  return (
    <>
      {
        cards.map((item, index) => {
          if (item.publication_type === 'news') {
            return null
          }
          return <div
            key={index}
            className={styles.card}
            style={{width}}>
            <div>
              {item.user && !item.is_owner ?
                <CardHead user={item.user} setRecoilState={setRecoilState} index={index}/> : null}
              <Link href={`/detail/${item.id}`}>
                <div className={styles.content}>
                  <div>
                    <CardSlider images={item.images} owner={item.is_owner}/>
                    {item && item.is_owner && false ? null : <div
                      onClick={(e) => onClickFavourite(item.id, index, setRecoilState, e, page)}
                      style={item.is_owner ? {top: "50px"} : {}}
                      className={styles.favorite}
                    >
                      {item.is_favorite ? <HeartFill/> : <Heart/>}
                    </div>}
                    {item && item.is_owner ? <div
                      className={styles.btnGroup}
                    >
                      <Edit onClick={e => onClickEdit(e, item.id)}/>
                      <Delete onClick={onClickDelete}/>
                    </div> : null}
                    <CardBody categories={item.categories} description={item.description}/>
                  </div>
                </div>
              </Link>
            </div>
            <ModalDeleteCard state={state} id={item.id} setState={setState}/>
            <CardFooter created_at={item.created_at} comment_count={item.comment_count}
                        viewed={item.viewed}/>
          </div>
        })
      }
    </>
  )
}

export default Card;