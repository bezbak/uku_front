import styles from './styles.module.scss'
import {useRecoilState} from "recoil";
import {registrationForm} from "../../state";
import {modalState} from "../../../UI/modalState";
import {useState} from "react";


const RegionMenu = ({items}) => {

    const [modal, setModal] = useRecoilState(modalState)
    const [form, setForm] = useRecoilState(registrationForm)
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

        setForm(old => ({...old, region: {id: place.id, name: place.name}}))
        setModal(!modal)

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

export default RegionMenu;