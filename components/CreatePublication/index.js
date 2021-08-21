import {useRecoilState} from "recoil";
import createWindow from "./state";
import styles from './styles.module.scss'
import cs from 'classnames'
import {useEffect, useState} from "react";

const CreatePublication = ({edit}) => {

    const [create, setCreate] = useRecoilState(createWindow)
    const [form, setForm] = useState({
        text: "",
        image: "",

    })

    useEffect(() => {
        if (create.fullWindow) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [create.fullWindow])

    const createClass = cs({
        [styles.create]: create.fullWindow && create.bottomPanel || edit,
        "hide": !create.fullWindow
    })

    const inputFileHandler = image => {
        console.log(image)
    }

    const addMoreImage = cs({
        [styles.addMoreImage]: true,
        "hide": false
    })

    return (
        <>
            <div className={createClass}>
                <div className={styles.top}>
                    <div
                        onClick={() => setCreate(old => ({...old, fullWindow: false}))}
                        className={styles.times}>&times;</div>
                    <h3>Просмотр</h3>
                </div>
                <div className={styles.image}>
                </div>
                <div className={styles.images}>
                    <div className={addMoreImage}/>
                </div>
            </div>
            <div className={create.bottomPanel ? styles.createPanel : "hide"}>
                <label htmlFor="upload-photo" className={styles.addImage}>
                    <img src="/icons/addImage.png" alt=""/>
                    <input onChange={e => inputFileHandler(e)} type="file" id="upload-photo"/>
                </label>
                <textarea
                    onFocus={() => setCreate(old => ({...old, fullWindow: true}))}
                    placeholder={"Введите описание объявления"}
                    name="desc"
                    id="desc"
                    cols="80"
                    rows="3"/>
                <button className={styles.publishBtn}>Опубликовать</button>
            </div>
        </>

    )
}

export default CreatePublication;