import styles from './styles.module.scss'
import {phoneNumber} from "../state";
import {login} from "../state";
import {requestLoading} from "../state";
import {useRecoilState} from "recoil";
import {useEffect, useState} from "react";
import uku from "../../../util/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";
import {toast} from "react-toastify";
import Spinner from "../../Spinner/Spinner";

const LoginConfirmation = () => {

    const [phone, setPhone] = useRecoilState(phoneNumber)
    const [loginState, setLoginState] = useRecoilState(login)
    const [time, setTime] = useState(60)
    const [loading, setLoading] = useRecoilState(requestLoading)
    const [code, setCode] = useState("")

    const incorrectNumber = () => {
        setLoginState(oldState => ({...oldState, state: "login"}))
    }

    const resendCode = () => {
        setLoading(true)
        fetch(uku + endpoints.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({phone: `+${phone}`})
        }).then(response => response.json().then(data => {
            setLoading(false)
            if (response.status === 201 || 200) {
                toast("Код переотправлен")
            }
        })).catch(err => {
            setLoading(false)
            toast.error(err.message)
        })
    }

    const confirmCode = () => {
        setLoading(true)
        fetch(uku + endpoints.loginConfirm, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({phone: `+${phone}`, confirmation_code: code})
        }).then(response => response.json().then(data => {
            setLoading(false)
            if (data.token) {
                setLoginState(({...data, state: "register"}))
                window && window.localStorage.setItem("token", JSON.stringify(data.token))
                window && window.localStorage.setItem("authData", JSON.stringify((data)))
            }
            if (response.status >= 400) toast.error("Неверный код")
        })).catch(err => {
            err.json().then(data => {
                setLoading(false)
                toast.error(data.message)
            })
        })
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time - 1)
        }, 1000)
        if (time === 0) clearInterval(timer)

        return () => clearInterval(timer)
    }, [time])

    return (
        <div className={styles.confirm}>
            <h3>Подтверждение кода</h3>
            <p>Код был отправлен на номер</p>
            <span className={styles.phone}>
                {phone}
                <span
                    onClick={() => incorrectNumber()}
                    className={styles.incorrectNumber}>Неверный номер?
                </span>
            </span>
            <input
                onChange={({target: {value}}) => setCode(value)}
                type="text"
                className={styles.confirmInp}
                placeholder={"Код"}
            />
            <button
                disabled={!code || loading}
                onClick={() => confirmCode()}
                className={styles.confirmBtn}>
                {loading ? <Spinner/> : "Подтвердить"}
            </button>
            <div className={styles.resend}>
                <p>Не пришло SMS сообщение?</p>
                <button
                    onClick={() => resendCode()}
                    disabled={time || loading}
                >
                    {time ?
                        <div>Переотправить через <span>{time}</span></div> : loading ? <Spinner/> : "Отправить"}
                </button>
            </div>
        </div>
    )
}

export default LoginConfirmation;