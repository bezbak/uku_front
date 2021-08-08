import styles from './styles.module.scss'
import {useRecoilState} from "recoil";
import {registrationForm} from "../../state";
import {modalState} from "../../../UI/modalState";
import {useState} from "react";

const RegionMenu = ({place}) => {

    const [modal, setModal] = useRecoilState(modalState)
    const [form, setForm] = useRecoilState(registrationForm)
    // const [active, setActive] = useState("main")

    const nestedRegions = (place && place.children || []).map(place => (
            <RegionMenu key={place.id} place={place} type={"child"}/>
        )
    )

    const onClickRegion = (id, name) => {
        setForm(oldState => ({...oldState, region: {id, name}}))
        setModal(!modal)
    }

    return (
        <ul
            className={styles.regionMenu}
            style={{"marginTop": "10px", marginLeft: "15px"}}>
            <li key={place && place.id}>
                <div
                    className={styles.regionItem}>
                    <span
                        id={place.id}
                        onClick={({target: {id}}) => onClickRegion(id, place.name)}>
                        {place && place.name}
                    </span>
                    <img src="/icons/arrow.png" alt=""/>
                </div>
                {nestedRegions}
            </li>
        </ul>
    )
}

export default RegionMenu;