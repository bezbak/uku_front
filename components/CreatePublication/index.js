import {useRecoilState} from "recoil";
import createWindow from "./state";
import styles from './styles.module.scss'
import cs from 'classnames'
import {useEffect, useState} from "react";

const CreatePublication = ({edit}) => {

    const [create, setCreate] = useRecoilState(createWindow)
    const [images, setImages] = useState({
        previewImage: 0,
        files: []
    })

    const [form, setForm] = useState({
        category: null,
        location: "",
        description: "",
    })

    useEffect(() => {
        if (create.fullWindow) {
            window.scrollTo(0, 0)
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [create.fullWindow])

    const onInputFile = file => {
        setCreate(old => ({...old, fullWindow: true}))
        setImages(old => ({...old, files: [...old.files, ...file]}))
    }

    return (
        <div>
            <div className={create.fullWindow && create.bottomPanel ? styles.createBox : "hide"}>
                <div className={styles.topPanel}>
                    <span onClick={() => setCreate(old => ({...old, fullWindow: false}))}
                          className={styles.close}>&times;</span>
                    <span className={styles.title}>Просмотр</span>
                </div>

                <div className={styles.preview}>
                    {!!images.files.length ?
                        <img
                            src={URL.createObjectURL(images.files[images.previewImage])} alt=""/> : null}
                </div>

                <div className={styles.images}>
                    {images.files.length && images.files.length < 10 ?
                        <>
                            <label
                                className={styles.addMoreImage}
                                htmlFor="upload-photo"/>
                            <input
                                onChange={({target: {files}}) => onInputFile(files)}
                                type="file"
                                name="photo"
                                id="upload-photo"/>
                        </>
                        : null}
                    {images.files.map((image, index) => {
                        return <img
                            style={images.previewImage === index ? {border: "1px solid red"} : {}}
                            onClick={() => setImages(old => ({...old, previewImage: index}))}
                            className={styles.imagesList}
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt=""/>
                    })}

                </div>
            </div>
            <div className={create.bottomPanel ? styles.bottomPanel : "hide"}>
                {!!images.files.length ? null : <label htmlFor="upload-photo"/>}
                <input
                    onChange={({target: {files}}) => onInputFile(files)}
                    type="file"
                    name="photo"
                    id="upload-photo"/>
                <textarea
                    name="text"
                    id="text"
                    onFocus={() => setCreate(old => ({...old, fullWindow: true}))}
                    cols="80"
                    rows="1"/>
                <button>Опубликовать</button>
            </div>
        </div>

    )
}

export default CreatePublication;

