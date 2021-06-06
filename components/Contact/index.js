import React, {useEffect} from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NavLink from "../NavLink";
import styles from './styles.module.scss'
import {actions} from "../../public/store/system/slice";
import {parseMarkdown} from "../../public/lib/parser";

const Contact = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(actions.contactInfoRequestStart());
  })
  const contactInfo = useSelector((store) => store.system.contact);
  console.log(contactInfo)
  return (
    <div className={styles.contact}>
      <div className={styles.contact__headline}>
        <span>
          Наши контактные данные
        </span>
      </div>
      <div className={styles.contact__content}>
        <div className={styles.contact__content_left}>
          <img src={contactInfo?.image}/>
        </div>
        <div className={styles.contact__content_right}>
          <div className={styles.contact__content_right__title}>
            <span>
              {parseMarkdown(contactInfo?.title)}
            </span>
          </div>
          <div className={styles.contact__content_right__about}>
            {parseMarkdown(contactInfo?.description)}
          </div>
          <div className={styles.contact__content_right__contact}>
            <div className={styles.contact__content_right__list}>
              <div className={styles.contact__content_right__list_title}>Наши телефоны:</div>
              <ul>
                {
                  contactInfo?.phone_numbers?.map ((phoneNumber)=>{
                    return(
                      <li key={phoneNumber.id}>
                        <a className={styles.contact__content_right__list_link} href={`tel:${phoneNumber.phone}`} target="_blank">
                          <img src="icons/phone.svg"/>
                          <span>{phoneNumber.phone}</span>
                        </a>
                      </li>
                    )
                  })
                }

              </ul>
            </div>
            <div className={styles.contact__content_right__list}>
              <div className={styles.contact__content_right__list_title}>Мы в соц. сетях:</div>
              <ul>
                <li>
                  <a className={styles.contact__content_right__list_link} href={` https://telegram.me/${contactInfo?.telegram}`} target="_blank">
                    <img src="icons/telegram.png"/>
                    <span>Телеграм</span>
                  </a>
                </li>
                <li>
                  <a className={styles.contact__content_right__list_link} href={contactInfo?.facebook} target="_blank">
                    <img src="icons/whatsApp.png"/>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a className={styles.contact__content_right__list_link}  href={contactInfo?.instagram} target="_blank">
                    <img src="icons/instagram.png"/>
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.contact__content_right__list}>
              <div className={styles.contact__content_right__list_title}>Наш адрес:</div>
              <ul>
                <li>
                  <a className={styles.contact__content_right__list_link} href={`http://maps.google.com/?q=${contactInfo?.address}`} target="_blank">
                    <img src="icons/address.png"/>
                    <span>
                      {contactInfo?.address}
                    </span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
export default Contact;