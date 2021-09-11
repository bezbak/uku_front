import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import {getLocations} from "./getLocations";
import RegionMenu from "../../Login/Registration/Region/RegionMenu";
import {useRecoilState} from "recoil";
import {locationAtom} from "../../HeaderNavbar/Location/state";

const LocationPicker = () => {

  const [displayChildren, setDisplayChildren] = useState({})
  const [items, setItem] = useState([])
  const [location, setLocation] = useRecoilState(locationAtom)


  useEffect(async () => {
    const data = await getLocations()
    setItem(data)
  }, [])

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
    console.log(place)
    setLocation(place)

  }

  return (
    <ul style={{marginLeft: "10px"}}>
      {items && items.map(item => {
        return (
          <li key={item.id}>
            <div className={styles.list}>
              <span onClick={(e) => onClickPlace(e, item)}>{item.name}</span>
              {item.children && (
                item.children.length !== 0 ?
                  <button
                    className={styles.regionMenuBtn}
                    style={displayChildren[item.name] ?
                      {
                        background: `url(/icons/arrow.png) no-repeat`,
                        transform: "rotate(90deg)"
                      } :
                      {background: `url(/icons/arrow.png) no-repeat`}}
                    onClick={(e) => listHandler(e, item.name)}/> : null
              )}
            </div>
            {displayChildren[item.name] && item.children && <RegionMenu items={item.children}/>}
          </li>
        );
      })}
    </ul>
  )
}

export default LocationPicker;