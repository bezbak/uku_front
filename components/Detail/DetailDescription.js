import React, {useEffect} from "react";
import Comment from "./Comment";
import styles from './styles.module.scss'
import {createRef, Fragment, useState} from "react";
import uku from "../../util/HTTP_Agent";
import {toast} from "react-toastify";
import classNames from "classnames";
import {useRecoilState} from "recoil";
import {detailPublicationState} from "./state";

const DetailDescription = () => {
    const [file, setFile] = useState(null)
    const inputRef = createRef()
    const [recoilState, setRecoilState] = useRecoilState(detailPublicationState)
    const id =  recoilState.id
    const [comments, setComments] = useState([])
    const [selectedOption, setSelectedOption] = useState({
        options: "input",
        id: null,
        onFocus: false,
        value: '',
        showMore: false,
        showMoreId: null
    })

    React.useEffect(() => {
        setComments(recoilState.comments)
    },[recoilState.comments])

    const handleSelectedOptions = (options, id, value) => {
        (setSelectedOption(old => ({...old, options: options, id: id, onFocus: false, value: value})))
        if (value === '') {(setSelectedOption({options: "input", id: null, onFocus: false, value: value}))}
        inputRef.current.focus()
    }

    const showMoreHandler = (flag, id) => {
        setSelectedOption(oldState => (
            {...oldState, [flag]: !oldState[flag], showMoreId: id}
        ))
    }
    const handleFile = fileList => {
        setFile(fileList[0])
    }

    const addCommentHandler = () => {
        const token = JSON.parse(window.localStorage.getItem("token"))
        const formData = new FormData()
        if(file){
            formData.append("image", file ? file : null)
        }
        formData.append("text", selectedOption.value)
        formData.append("id", selectedOption.id || id)
        if (!token) {
            toast.error('Вы не авторизованы')
            return
        }else{
            if (selectedOption.options === 'input') {
                fetch(uku + `/publication/comment/${id}/add_comment/`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                        body: formData
                    })
                    .then((res) => {return res.json()})
                    .then((data) => {setRecoilState(old => ({...old, comments: [...old.comments, data]}))})
                    .then(() => {setSelectedOption({options: "input", id: null, onFocus: false, value: '', showMore: false,})})
                    .then(() => {setFile(null)})
                    .catch(err => {toast.error(err.message)})
            } else if (selectedOption.options === "answer") {
                fetch(uku + `/publication/comment/${id}/add_comment/?comment_id=${selectedOption.id}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    body: formData
                })
                    .then(() => {setSelectedOption({options: "input", id: null, onFocus: false, value: '', showMore: true,})})
                    .then(() => {setFile(null)})
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
                        comments={comments}
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



