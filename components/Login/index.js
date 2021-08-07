import PhoneInput from "react-phone-input-2";
import styles from './styles.module.scss'
import {useState} from "react";
import Link from "next/link";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from '/api/endpoints'
import {useRecoilState} from "recoil";
import loginState from './state'
import Spinner from "../Spinner/Spinner";
import {toast} from "react-toastify";


const Index = () => {

    const [login, setLogin] = useRecoilState(loginState)
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    console.log(login)
    const onChangePhone = number => {
        setPhone(number)
        toast.error("Dalbaeb nahui, che piwew")
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
            }).then(response => setLoading(false)).catch(err => setLoading(false))
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

export default Index;