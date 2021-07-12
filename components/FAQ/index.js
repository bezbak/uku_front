import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/system/slice";
import Collapse from "../Collapse";
import styles from './styles.module.scss'

const FAQ = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.faqInfoRequestStart());
  })

  const faq = useSelector((store) => store.system.faq);

  return (
    <div className={styles.faq}>
      <div className={styles.faq__headline}>
        <span>
          F.A.Q.
        </span>
      </div>
      <ul className={styles.collapse__list}>
        {faq?.map((faqIn) => {
          return (
            <Collapse
              key={faqIn.id}
              title={faqIn.question}
              content={faqIn.answer}
              containerClassName={styles.collapse__item__visible}
              titleClassName={styles.collapse__item__title}
              descriptionClassName={styles.collapse__item__description}
            />
          )
        })}
      </ul>
    </div>
  )
}
export default FAQ;