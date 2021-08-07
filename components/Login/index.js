import PhoneInput from "react-phone-input-2";
import styles from './styles.module.scss'
import {useState} from "react";
import Link from "next/link";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from '/api/endpoints'
import {useRecoilState} from "recoil";
import {phoneNumber} from './state'
import {requestLoading} from "./state";
import {login} from "./state";
import Spinner from "../Spinner/Spinner";
import {toast} from "react-toastify";


const Login = () => {

    const [phone, setPhone] = useRecoilState(phoneNumber)
    const [loginState, setLoginState] = useRecoilState(login)
    const [loading, setLoading] = useRecoilState(requestLoading)
    const [error, setError] = useState(false)

    const onChangePhone = number => {
        setPhone(number)
        setError(false)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (phone.length === 12) {
            setLoading(!loading)
            fetch(uku + endpoints.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({phone: `+${phone}`})
            }).then(response => {
                setLoading(false)
                setLoginState("toConfirm")
            }).catch(err => {
                setLoading(false)
            })
        } else {
            setError(!error)
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.head}>
                <h3>Вход</h3>
                <Link href={"/"}>
                    <button>Отмена</button>
                </Link>
            </div>
            <form onSubmit={e => onSubmitHandler(e)}>
                <span className={error ? "error" : "hide"}>Проверьте правильность введенного номера</span>
                <PhoneInput
                    country={'kg'}
                    value={phone}
                    inputProps={{
                        required: true,
                        name: "phone",
                        autoFocus: true,
                        maxLength: 16
                    }}
                    onChange={num => onChangePhone(num)}
                />
                <button
                    disabled={phone.length !== 12}
                    type="submit"
                    className={styles.next}>
                    {loading ? <Spinner/> : "Далее"}
                </button>
            </form>
        </div>
    )
}

export default Login;