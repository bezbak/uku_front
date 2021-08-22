import Comment from "./Comment";
import styles from './styles.module.scss'
import {createRef, Fragment, useState} from "react";
import uku from "../../adapters/HTTP_Agent";
import {toast} from "react-toastify";
import classNames from "classnames";

const DetailDescription = (data) => {
    const [file, setFile] = useState(null)
    const inputRef = createRef()

    const [selectedOption, setSelectedOption] = useState({
        options: "input",
        id: null,
        onFocus: false,
        value: '',
        showMore: false,
    })

    const handleSelectedOptions = (options, id,value) => {
        (setSelectedOption({
            options: options,
            id: id,
            onFocus: false,
            value: value,
            showMore: true,
        }))
        if(value === '') {
            (setSelectedOption({
                options: "input",
                id: null,
                onFocus: false,
                value: value
            }))
        }
        inputRef.current.focus()
    }
    const showMoreHandler = (flag) => {
        setSelectedOption(oldState => ({...oldState, [flag]: !oldState[flag]}))
    }

    const addCommentHandler = () => {
        if(selectedOption.options === 'input'){
            console.log('add in input')
            fetch(uku + `/publication/comment/${data.id}/add_comment/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
                },
                body: JSON.stringify({text: `${selectedOption.value}` ||`${file}`})
            }).catch(err => {
                toast.error(err.message)
            })
        }else if(selectedOption.options === "answer"){
            console.log('add in answer')
            fetch(uku + `/publication/comment/${data.id}/add_comment/?comment_id=${selectedOption.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
                },
                body: JSON.stringify({text: `${selectedOption.value}` ||`${file}`})
            }).catch(err => {
                toast.error(err.message)
            })
        }
    }

    return (
        <Fragment>
            <div className={styles.detailDesc}>
                <div className={styles.category}>
                    <p>{data.category && data.category.name}</p>
                </div>
                <div className={styles.desc}>
                    <h3>Описание</h3>
                    <p>{data.description && data.description}</p>
                </div>
                <div className={styles.comment}>
                    <h3>Комментарии</h3>
                    <Comment
                        selectedOption={selectedOption}
                        comments={data.comments && data.comments}
                        handleSelectedOptions={handleSelectedOptions}
                        showMoreHandler={showMoreHandler}
                    />
                </div>
            </div>
            <div className={styles.sendComment}>
                <div className={styles.sendCommentInner}>
                        <div className={styles.fileHover}>
                            {file ? <img src={file} alt="#" width={"100px"} height={'100px'}/>
                                    : <img src={'/icons/load-img.png'} alt="#"  width={"22px"} height={"19px"} />}
                            <input type="file" onChange={e => setFile(e.target.value)}/>
                        </div>
                        <form>
                            <input
                                type="text"
                                placeholder='Ваш комментарий'
                                value={selectedOption.value}
                                onChange={e => handleSelectedOptions( selectedOption.options, selectedOption.id, e.target.value)}
                                ref={inputRef}
                                />
                            <button
                                disabled={selectedOption.value ? false : true}
                                className={classNames(selectedOption.value ? styles.btnActive : styles.btn)}
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