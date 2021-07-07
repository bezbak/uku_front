import React from "react";
import styles from './styles.module.scss'

const Container = ({children}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_content}>
          {
            children
          }
        </div>
      </div>
    </>
  )
}
export default Container;