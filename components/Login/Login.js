import PhoneInput from "react-phone-input-2";
import styles from './styles.module.scss'
import {useState} from "react";
import Link from "next/link";
import Spinner from "../Spinner/Spinner";

const Login = () => {

    const [phone, setPhone] = useState("")
    const [error, setError] = useState(false)

    const onChangePhone = number => {
        setPhone(number)
        setError(false)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (phone.length === 12) {

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
                    Далее
                    {/*<Spinner/>*/}
                </button>
            </form>
        </div>
    )
}

export default Login;