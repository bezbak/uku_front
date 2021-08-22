import {useRecoilState} from "recoil";
import createWindow from "./state";
import styles from './styles.module.scss'
import cs from 'classnames'
import {useEffect, useState} from "react";

const CreatePublication = ({edit}) => {

    const [create, setCreate] = useRecoilState(createWindow)
    const [images, setImages] = useState({
        preview: "",
        images: ""
    })
    const [form, setForm] = useState({
        category: null,
        location: "",
        description: "",

    })

    console.log(images)

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

    const inputFileHandler = e => {
        console.log(URL.createObjectURL(e.target.files[0]))
        setImages(old => ({...old, preview: URL.createObjectURL(e.target.files[0])}))
    }

    const fileInputClass = cs({
        [styles.addImage]: !images.preview,
        "hide": images.preview
    })

    const addMoreImage = cs({
        [styles.addMoreImage]: true,
        "hide": false
    })

    return (

        <div>
            <div className={createClass}>
                <div className={styles.top}>
                    <div
                        onClick={() => setCreate(old => ({...old, fullWindow: false}))}
                        className={styles.times}>&times;</div>
                    <h3>Просмотр</h3>
                </div>
                <div className={styles.image}>
                    <img src={images.preview} alt=""/>
                </div>
                <div className={styles.images}>
                    <div className={addMoreImage}/>
                </div>
            </div>
            <div className={create.bottomPanel ? styles.createPanel : "hide"}>
                <div>
                    <label htmlFor="upload-photo" className={styles.addImage}>
                        <img src="/icons/addImage.png" alt=""/>
                        <input
                            style={{display: "none"}}
                            onChange={e => inputFileHandler(e)} type="file" id="upload-photo"/>
                    </label>
                </div>
                <textarea
                    onFocus={() => setCreate(old => ({...old, fullWindow: true}))}
                    onChange={({target: {value}}) => setForm(value)}
                    placeholder={"Введите описание объявления"}
                    name="desc"
                    id="desc"
                    cols="80"
                    rows="3"/>
                <button className={styles.publishBtn}>Опубликовать</button>
            </div>
        </div>
    )
}

export default CreatePublication;