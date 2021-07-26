import React, {useEffect, useState} from "react";
import classNames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import NavCollapse from "./NavCollapse";
import styles from './styles.module.scss';
import {actions} from "../../store/category/slice";

const CategoryNavbar = () => {
  const dispatch = useDispatch()
  const categories = useSelector((store) => store.category?.category)
  const [category_id, setCategory_id] = useState(categories[0]?.id)

  useEffect(() => {
    dispatch(actions.setCategoryId(category_id))
  }, [category_id])

  function categoriesInCategory(childrenCategory) {
    return childrenCategory?.map(childCategory => {
      return (
        <NavCollapse title={childCategory.name}
                     collapseIcon={(childCategory.children?.length > 0) ? true : false}
                     className={styles.navbar__subsubcategory}
                     titleClassName={styles.navbar__subsubcategory__title}
                     contentClassName={styles.navbar__subsubcategory__content}
                     onClick={() => {
                       setCategory_id(childCategory.id)
                       dispatch(actions.setPublicationId(childCategory.id))
                       categoriesInCategory(childCategory.children)
                     }}
        >
          {childCategory.children?.length > 0 && categoriesInCategory(childCategory.children)}
        </NavCollapse>
      )
    })
  }

  return (
    <div className={styles.navbar}>
      <ul className={styles.navbar__category}>

        {categories?.map((category, index) => {
          return (
            <NavCollapse title={category.name} key={index}
                         collapseIcon={(category.children?.length > 0) ? true : false}
                         className={styles.navbar__category__collapse}
                         titleClassName={styles.navbar__category__title}
                         titleActiveClassName={classNames({[styles.navbar_activeTitle]: category.id === category_id})}

                         onClick={() => {
                           setCategory_id(category.id)
                           dispatch(actions.setCategoryId(category.id))
                         }}
            >
              {categories?.map(childCategory => {
                return (
                  <NavCollapse title={childCategory.name}
                               collapseIcon={(childCategory.children?.length > 0) ? true : false}
                               className={styles.navbar__subcategory}
                               contentClassName={styles.navbar__subcategory__content}
                               titleClassName={styles.navbar__subcategory__title}
                               titleActiveClassName={classNames({[styles.navbar_activeTitle]: childCategory.id === category_id})}
                               onClick={() => {
                                 setCategory_id(childCategory.id)
                                 dispatch(actions.setCategoryId(childCategory.id))
                               }}
                  >

                    {childCategory.children?.map(childCategory => {
                      return (
                        <NavCollapse title={childCategory.name}
                                     collapseIcon={(childCategory.children?.length > 0) ? true : false}
                                     className={styles.navbar__subsubcategory}
                                     titleClassName={styles.navbar__subsubcategory__title}
                                     contentClassName={styles.navbar__subsubcategory__content}
                                     titleActiveClassName={classNames({[styles.navbar_activeTitle]: childCategory.id === category_id})}
                                     onClick={() => {
                                       setCategory_id(childCategory.id)
                                       dispatch(actions.setCategoryId(childCategory.id))
                                     }}
                        >
                          {childCategory.children?.length > 0 && categoriesInCategory(childCategory.children)}
                        </NavCollapse>
                      )
                    })}

                  </NavCollapse>
                )
              })}
            </NavCollapse>
          )
        })}

      </ul>
    </div>
  )
}
export default CategoryNavbar;