import Comment from "./Comment";
import styles from './styles.module.scss'
import {createRef, Fragment, useState} from "react";
import uku from "../../adapters/HTTP_Agent";
import {toast} from "react-toastify";
import classNames from "classnames";
import {getComments} from "./request";
import {useRecoilState} from "recoil";
import {commentState} from "./state";

const DetailDescription = () => {
    const [file, setFile] = useState(null)
    console.log(file)
    const inputRef = createRef()
    const [recoilState, setRecoilState] = useRecoilState(commentState)
    const [selectedOption, setSelectedOption] = useState({
        options: "input",
        id: null,
        onFocus: false,
        value: '',
        showMore: false,
    })

    const handleSelectedOptions = (options, id, value) => {
        (setSelectedOption({options: options, id: id, onFocus: false, value: value, showMore: false,}))
        if (value === '') {(setSelectedOption({options: "input", id: null, onFocus: false, value: value,showMore: false,}))}
        inputRef.current.focus()
    }


    const showMoreHandler = (flag) => {
        setSelectedOption(oldState => ({...oldState, [flag]: !oldState[flag]}))
    }
    const handleFile = fileList => {
        setFile(fileList[0])
    }
    console.log(file)

    const addCommentHandler = () => {
        const token = JSON.parse(window.localStorage.getItem("token"))
        if (!token) {
            toast.error('Вы не авторизованы')
            return
        }else{
            if (selectedOption.options === 'input') {
                fetch(uku + `/publication/comment/${recoilState.id}/add_comment/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({text: selectedOption.value})
                })
                    .then(res => {getComments().then(data => setRecoilState(data))})
                    .then(() => {setSelectedOption({options: "input", id: null, onFocus: false, value: '', showMore: false,})})
                    .catch(err => {toast.error(err.message)})
            } else if (selectedOption.options === "answer") {
                fetch(uku + `/publication/comment/${recoilState.id}/add_comment/?comment_id=${selectedOption.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
                    },
                    body: JSON.stringify({text: selectedOption.value})})
                    .then(res => {getComments().then(data => setRecoilState(data))})
                    .then(() => {setSelectedOption({options: "input", id: null, onFocus: false, value: '', showMore: true,})})
                    .catch(err => {toast.error(err.message)})
            }
        }
    }



    return (
        <Fragment>
            <div className={styles.detailDesc}>
                <div className={styles.category}>
                    <p>{recoilState.category && recoilState.category.name}</p>
                </div>
                <div className={styles.desc}>
                    <h3>Описание</h3>
                    <p>{recoilState.description && recoilState.description}</p>
                </div>
                <div className={styles.comment}>
                    <h3>Комментарии</h3>
                    <Comment
                        selectedOption={selectedOption}
                        handleSelectedOptions={handleSelectedOptions}
                        showMoreHandler={showMoreHandler}
                    />
                </div>
            </div>
            <div className={styles.sendComment}>
                <div className={styles.sendCommentInner}>
                    <div className={styles.fileHover}>
                        {file ? <img src={URL.createObjectURL(file)} alt="#" width={"100px"} height={'100px'}/>
                            : <img src={'/icons/load-img.png'} alt="#" width={"22px"} height={"19px"}/>}
                        <input type="file" onChange={e => handleFile(e.target.files)}/>
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder='Ваш комментарий'
                            value={selectedOption.value}
                            onChange={e => handleSelectedOptions(selectedOption.options, selectedOption.id, e.target.value)}
                            ref={inputRef}
                        />
                        <button
                            disabled={selectedOption.value || file ? false : true}
                            className={classNames(selectedOption.value ||  file ? styles.btnActive : styles.btn)}
                            type='button'
                            onClick={addCommentHandler}>
                            Опубликовать
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default DetailDescription;