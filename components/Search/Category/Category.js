import styles from './styles.module.scss'
import {useEffect, useState} from "react";
import cs from 'classnames'
import classNames from "classnames";
import {useRecoilState} from "recoil";
import {categoryAtom} from "../../CreatePublication/state";
import {currentCategoryAtom} from "../state";


const Category = ({items}) => {
  const [displayChildren, setDisplayChildren] = useState({})
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryAtom)
  const [currentCategory, setCurrentCategory] = useRecoilState(currentCategoryAtom)

  // console.group("Current category")
  // console.log("Current category is", currentCategory)
  // console.log("Current category === ad?", JSON.stringify(currentCategory).includes("аd"))
  // console.log("Current category === news?", currentCategory === "news")
  // console.log("typeof", typeof currentCategory)
  // console.groupEnd()

  const onClickHandler = (item, e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentCategory(item.category_type)
    setDisplayChildren({[item.name]: !displayChildren[item.name]});

    if (!displayChildren[item.name] && !item.children.length) {
      setSelectedCategory(item)
    } else {
      setSelectedCategory(null)
    }
  }

  const selectedClass = item => {
    return cs({
      [styles.selected]: displayChildren[item.name] && !item.children.length && currentCategory.includes("d")
    })
  }

  const arrowStyleActive = {
    background: `url(/icons/categoryArrow.png)`,
    transform: "rotate(90deg)",
  }

  const arrowStyleDefault = {
    background: `url(/icons/categoryArrow.png)`
  }


  return (
    <div className={styles.mainMenu}>
      <ul style={{marginLeft: "10px"}} className={classNames(styles.category)}>
        {items && items.map(item => {

          if (item.category_type === "news") {
            return null
          }

          return (
            <li
              key={item.id}
              onClick={e => onClickHandler(item, e)}>
              <div className={classNames(styles.catBody, selectedClass(item))}>
                {item.image ? <img src={item.image} alt=""/> : null}
                {item.name}{' '}
                {item.children.length ? (
                  <button
                    className={styles.btn}
                    style={displayChildren[item.name] ? arrowStyleActive : arrowStyleDefault
                    }
                  />
                ) : null}
                <div
                  className={displayChildren[item.name] && !item.children.length && currentCategory?.includes("d") ? styles.round : 'hide'}/>
              </div>
              {displayChildren[item.name] && item.children && <Category items={item.children}/>}
            </li>
          );
        })}
      </ul>
    </div>

  )
}

export default Category;