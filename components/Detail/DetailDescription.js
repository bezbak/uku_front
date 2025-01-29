import React, { useEffect } from "react";
import Comment from "./Comment";
import styles from './styles.module.scss'
import { createRef, Fragment, useState } from "react";
import uku from "../../util/HTTP_Agent";
import { toast } from "react-toastify";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { detailPublicationState } from "./state";
import { useRouter } from "next/router";
import { getDetailPublication } from "./request";
import Head from "next/head";

const DetailDescription = ({initialData }) => {
    const [file, setFile] = useState(null)
    const router = useRouter()
    const inputRef = createRef()
    const [recoilState, setRecoilState] = useRecoilState(detailPublicationState)
    const id = router.query.detail
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
    }, [recoilState.comments])

    const handleSelectedOptions = (options, id, value) => {
        setSelectedOption(old => ({ ...old, options: options, id: id, onFocus: false, value: value }))

        if (value === '') {
            (setSelectedOption({ options: "input", id: null, onFocus: false, value: value }))
        }
        inputRef.current.focus()
    }

    const showMoreHandler = (flag, id) => {
        setSelectedOption(oldState => (
            { ...oldState, [flag]: !oldState[flag], showMoreId: id }
        ))
    }

    const addCommentHandler = () => {
        const token = JSON.parse(window.localStorage.getItem("token"))
        const formData = new FormData()

        if (file) {
            formData.append("image", file ? file : null)
        }

        formData.append("text", selectedOption.value)
        formData.append("id", selectedOption.id || id)

        if (!token) {
            toast.error('Вы не авторизованы')
            return
        }

        if (selectedOption.options === 'input') {
            fetch(uku + `/publication/comment/${id}/add_comment/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    body: formData
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setRecoilState(old => ({ ...old, comments: [...old.comments, data] }))
                })
                .then(() => setSelectedOption({
                    options: "input",
                    id: null,
                    onFocus: false,
                    value: '',
                    showMore: false,
                }))
                .then(() => setFile(null))
                .catch(err => toast.error(err.message))
        } else if (selectedOption.options === "answer") {
            fetch(uku + `/publication/comment/${id}/add_comment/?comment_id=${selectedOption.id}`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: formData
            })
                .then(() => {
                    setSelectedOption({ options: "input", id: null, onFocus: false, value: '', showMore: true, })
                    getDetailPublication().then(data => {
                        setRecoilState(data)
                    })
                })
                .then(() => setFile(null))
                .catch(err => toast.error(err.message))
        }
    }


    return (
        <>
            <Head>
                <title>{initialData?.description && initialData?.description} - uku.kg</title>
                <meta name="description" content={initialData?.description && initialData?.description} />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="google" content="notranslate" />
                <meta name="keywords" content={initialData?.description && initialData?.description} />
                <meta name="robots" content="all" />
                <meta property="og:title" content="Лента новостей" />
                <meta property="og:description" content={initialData?.description && initialData?.description} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/_logo.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/_logo.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/_logo.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/images/_logo.png" />
                <meta property="og:url" content="https://uku.kg/" />
                <link rel="canonical" href="https://uku.kg/" />
            </Head>

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
                            {file ? <img src={URL.createObjectURL(file)} alt="#" width={"100px"} height={'100px'} />
                                : <img src={'/icons/load-img.png'} alt="#" width={"22px"} height={"19px"} />}
                            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
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
                                disabled={!(selectedOption.value || file)}
                                className={classNames(selectedOption.value || file ? styles.btnActive : styles.btn)}
                                type='button'
                                onClick={addCommentHandler}>
                                Опубликовать
                            </button>
                        </form>
                    </div>
                </div>
            </Fragment>
        </>
    )
}

export default DetailDescription;



