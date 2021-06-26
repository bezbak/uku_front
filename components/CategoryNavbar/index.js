import React, {useState} from "react";
import ArrowIcon from '../../public/icons/ArrowIcon.svg'
import styles from './styles.module.scss';
import NavCollapse from "./NavCollapse";
import { useSelector} from "react-redux";

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
  console.log(categories)
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