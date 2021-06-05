import React from "react";
import NavLink from "../NavLink";
import styles from './styles.module.scss'

const Contact = () => {
  return (
    <div className={styles.contact}>
      <div className={styles.contact__hedline}>
        <span>
          Наши контактные данные
        </span>
      </div>
      <div className={styles.contact__content}>
        <div className={styles.contact__content_left}/>
        <div className={styles.contact__content_right}>
          <div className={styles.contact__content_right__title}>
            <span>
              О нас
            </span>
          </div>
          <div className={styles.contact__content_right__about}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique
            nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus
            consequat tincidunt aliquam enim risus. Est viverraLorem ipsum dolor sit amet, consectetur adipiscing elit.
            Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus
            massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra
          </div>
          <div className={styles.contact__content_right__contact}>
            <div className={styles.contact__content_right__list}>
              <div className={styles.contact__content_right__list_title}>Наши телефоны:</div>
              <ul>
                <li>
                  <NavLink className={styles.contact__content_right__list_link}>
                    <img src="icons/phone.svg"/>
                    <span>+996 (555) 55 55 55</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.contact__content_right__list_link}>
                    <img src="icons/phone.svg"/>
                    <span>+996 (555) 55 55 55</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.contact__content_right__list_link}>
                    <img src="icons/phone.svg"/>
                    <span>+996 (555) 55 55 55</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={styles.contact__content_right__list}>
              <div className={styles.contact__content_right__list_title}>Мы в соц. сетях:</div>
              <ul>
                <li>
                  <NavLink className={styles.contact__content_right__list_link}>
                    <img src="icons/telegram.png"/>
                    <span>Телеграм</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.contact__content_right__list_link}>
                    <img src="icons/whatsApp.png"/>
                    <span>WhatsApp</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.contact__content_right__list_link}>
                    <img src="icons/instagram.png"/>
                    <span>Instagram</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={styles.contact__content_right__list}>
              <div className={styles.contact__content_right__list_title}>Наш адрес:</div>
              <ul>
                <li>
                  <NavLink className={styles.contact__content_right__list_link}>
                    <img src="icons/address.png"/>
                    <span>
                      Бишкек, Ахунбаева 125/66
                    </span>
                  </NavLink>
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