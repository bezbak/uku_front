import React, {useState} from "react";
import { useSelector} from "react-redux";
import NavCollapse from "./NavCollapse";
import styles from './styles.module.scss';

const CategoryNavbar = ({setSelectedCategory}) => {
  const [categoryInChildCategory, setCategoryInChildCategory] = useState([])
  const [listCategory, setCategory] = useState([])
  const categories= useSelector((store) => store.category?.category)
  function categoriesInCategory(childrenCategory) {
   return childrenCategory?.map(childCategory=>{
      return(
        <NavCollapse title={childCategory.name}
                     collapseIcon={(childCategory.children?.length>0) ? true : false}
                     className={styles.navbar__subsubcategory}
                     titleClassName={styles.navbar__subsubcategory__title}
                     contentClassName={styles.navbar__subsubcategory__content}
                     onClick={()=>categoriesInCategory(childCategory.children)}
        >
          {childCategory.children?.length>0 && categoriesInCategory(childCategory.children) }
        </NavCollapse>
      )
    })}
  return(
    <div className={styles.navbar}>
      <ul className={styles.navbar__category}>
      {categories?.map((category,index)=>{
        return (
          <NavCollapse title={category.name} key={index}
                       collapseIcon={false}
                       className={styles.navbar__category__collapse}
                       titleClassName={styles.navbar__category__title}
          >
            {category.categories?.map(childCategory=>{
              return(
                <NavCollapse title={childCategory.name}
                             collapseIcon={(childCategory.children?.length>0) ? true : false}
                             className={styles.navbar__subcategory}
                             contentClassName={styles.navbar__subcategory__content}
                             titleClassName={styles.navbar__subcategory__title}

                >
                  {childCategory.children?.map(childCategory=>{
                    return(
                      <NavCollapse title={childCategory.name}
                                   collapseIcon={(childCategory.children?.length>0) ? true : false}
                                   className={styles.navbar__subsubcategory}
                                   titleClassName={styles.navbar__subsubcategory__title}
                                   contentClassName={styles.navbar__subsubcategory__content}
                      >
                        {childCategory.children?.length>0 && categoriesInCategory(childCategory.children)}
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