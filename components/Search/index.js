import React from "react";
import {Field, Form} from "react-final-form";
import styles from './styles.module.scss'

const Search = () => {
  const onSubmit = (value) => (
    console.log(value)
  );


  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit, values}) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="search"
              component="input"
              type="text"
              placeholder="Кого будем искать"
              className={styles.search}
            />
          </form>
        )}
      />

    </div>
  )
}
export default Search;