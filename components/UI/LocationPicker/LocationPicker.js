import React, {useState} from 'react';
import styles from './styles.module.scss'
import cs from 'classnames'
import {useRecoilState} from "recoil";
import {locationAtom} from "../../Search/state";

const LocationPicker = ({items, setLocation, setModal}) => {
  const [displayChildren, setDisplayChildren] = useState({})

  const listHandler = (e, name) => {
    e.preventDefault()
    e.stopPropagation()
    setDisplayChildren({
      ...displayChildren,
      [name]: !displayChildren[name],
    });
  }
  const onClickPlace = (e, place) => {
    e.preventDefault()
    e.stopPropagation()
    setLocation(old => ({...old, region: place}))
    setModal(false)
  }

  const arrowClass = active => {
    return cs({
      [styles.regionMenuBtn]: true,
      [styles.regionMenuBtnActive]: active
    })
  }
  return (
    <ul style={{marginLeft: "10px"}}>
      {items && items.map(item => {
        return (
          <li key={item.id}>
            <div className={styles.list} onClick={(e) => onClickPlace(e, item)}>
              <span>{item.name}</span>
              {item.children && (item.children.length !== 0 ?
                  <button
                    className={arrowClass(displayChildren[item.name])}
                    onClick={(e) => listHandler(e, item.name)}>
                    <img src="/icons/rightArrow.svg" alt=""/>
                  </button> : null
              )}
            </div>
            {displayChildren[item.name] && item.children.length &&
            <LocationPicker items={item.children} setLocation={setLocation} setModal={setModal}/>}
          </li>
        );
      })}
    </ul>
  )
}

export default LocationPicker;