import {useRecoilState} from "recoil";
import createWindow from "./state";
import styles from './styles.module.scss'
import cs from 'classnames'

const CreatePublication = () => {

    const [create, setCreate] = useRecoilState(createWindow)

    const createClass = cs({
        [styles.create]: create || true,
        // "hide": true
    })

    const inputFileHandler = image =>{

    }

    return (
        <div className={createClass}>
            <div className={styles.top}>
                <div className={styles.times}>&times;</div>
                <h3>Просмотр</h3>
            </div>
            <div className={styles.image}>
            </div>
            <div className={styles.images}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={styles.createPanel}>
                <label htmlFor="upload-photo" className={styles.addImage}>
                    <img src="/icons/addImage.png" alt=""/>
                    <input onChange={e=>inputFileHandler(e)} type="file" id="upload-photo"/>
                </label>
                {/*<button className={styles.addBtn}>*/}
                {/*    <img src="/icons/addImage.png" alt=""/>*/}
                {/*</button>*/}
                <textarea
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