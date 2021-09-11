import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {categoryAtom, newsAtom} from "../../CreatePublication/state";
import cs from "classnames";
import styles from "../Category/styles.module.scss";
import classNames from "classnames";
import {currentCategoryAtom} from "../state";

const News = ({items}) => {
  const [displayChildren, setDisplayChildren] = useState({})
  const [news, setNews] = useRecoilState(newsAtom)
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryAtom)
  const [currentCategory, setCurrentCategory] = useRecoilState(currentCategoryAtom)
  // console.group("Current category")
  // console.log("Current category is", currentCategory)
  // console.log("Current category === ad?", currentCategory === "ad")
  // console.groupEnd()

  const onClickHandler = (item, e) => {
    e.preventDefault()
    e.stopPropagation()

    setCurrentCategory(item.category_type)
    setDisplayChildren({[item.name]: !displayChildren[item.name]});

    if (!displayChildren[item.name] && !item.children.length) {
      setSelectedCategory(() => ({...item, currentCategoryType: item.category_type}))
    } else {
      setSelectedCategory(old => ({currentCategoryType: ""}))
    }
  }

  const selectedClass = item => {
    return cs({
      [styles.selected]: displayChildren[item.name] && !item.children.length && currentCategory === "news"
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
          if (item.category_type !== "news") {
            return null
          }

          return (
            <li
              key={item.id}
              onClick={e => onClickHandler(item, e)}>
              <div className={classNames(styles.catBody, selectedClass(item))}>
                {item.image ? <img src={item.image} className={styles.img} alt=""/> : null}
                {item.name}{' '}
                {item.children.length ? (
                  <button
                    className={styles.btn}
                    style={displayChildren[item.name] ? arrowStyleActive : arrowStyleDefault
                    }
                  />
                ) : null}
                <div
                  className={displayChildren[item.name] && !item.children.length && currentCategory === "news" ? styles.round : 'hide'}/>
              </div>
              {displayChildren[item.name] && item.children && <News items={item.children}/>}
            </li>
          );
        })}
      </ul>
    </div>

  )
}

export default News;