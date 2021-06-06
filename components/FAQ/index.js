import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../public/store/system/slice";
import Collapse from "../Collapse";
import styles from './styles.module.scss'

const FAQ = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(actions.faqInfoRequestStart());
  })
  const faq = useSelector((store) => store.system.faq);
  console.log(faq)
  return (
    <div className={styles.faq}>
      <div className={styles.faq__headline}>
        <span>
          F.A.Q.
        </span>
      </div>
      <ul className={styles.sectionOurAreasOfLegalExpertise__areas__list}>
        {faq?.map((faqIn) => {
          return (
            <Collapse
              key={faqIn.question}
              title={faqIn.question}
              content={faqIn.answer}
              containerClassName={styles.sectionOurAreasOfLegalExpertise__areas__item__visible}
              titleClassName={styles.sectionOurAreasOfLegalExpertise__areas__item__title}
              descriptionClassName={styles.sectionOurAreasOfLegalExpertise__areas__item__description}
            />
          )
        })}
      </ul>
    </div>
  )
}
export default FAQ;