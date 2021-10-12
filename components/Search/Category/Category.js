import styles from './styles.module.scss'
import {useEffect, useState} from "react";
import cs from 'classnames'
import classNames from "classnames";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import {categoryAtom, displayChildrenAtom} from "../../CreatePublication/state";
import {currentCategoryAtom, searchData} from "../state";


const Category = ({items}) => {
  const [displayChildren, setDisplayChildren] = useRecoilState(displayChildrenAtom)
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryAtom)
  const resetSearchData = useResetRecoilState(searchData)

  const onClickHandler = (item, e) => {
    e.preventDefault()
    e.stopPropagation()
    resetSearchData()
    setSelectedCategory(item.category_type)
    setDisplayChildren({[item.name]: !displayChildren[item.name]});

    if (!displayChildren[item.name]) {
      setSelectedCategory(item)
    } else {
      setSelectedCategory(null)
    }
  }

  const selectedClass = item => {
    return cs({
      [styles.selected]: displayChildren[item.name] && selectedCategory?.name === item.name,
      [styles.default]: !displayChildren[item.name]
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
          return (
            <li
              key={item.id}
              onClick={e => onClickHandler(item, e)}>
              <div className={classNames(styles.catBody, selectedClass(item))}>
                <div>
                  {item.image ? <img src={item.image} alt=""/> : null}
                  {item.name}{' '}
                </div>
                {item.children.length ? (
                  <button
                    className={styles.btn}
                    style={displayChildren[item.name] ? arrowStyleActive : arrowStyleDefault
                    }
                  />
                ) : null}
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