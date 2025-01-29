import React from 'react';
import styles from "../../containers/styles.module.scss";
import Loader from "react-loader-spinner";

const LoaderComponent = ({loading}) => {
  return (
    loading ? <div className={styles.loader}>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div> : null
  )
}

export default LoaderComponent;