import React from "react";
import styles from './styles.module.scss'
import Card from "../Card";

const Main = ({title = "Лента"}) =>{
  return (
    <div className={styles.main}>
      <div className={styles.main__title}>
        <span>
          {title}
        </span>
        <div className={styles.main__container}>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </div>
  )
}
export default Main;