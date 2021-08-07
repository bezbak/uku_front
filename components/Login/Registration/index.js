import styles from './styles.module.scss'
import Spinner from "../../Spinner/Spinner";
import {useRecoilState} from "recoil";
import {requestLoading} from "../state";
import {phoneNumber} from "../state";
import {login} from "../state";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import {useRouter} from "next/router";
import useSWR from "swr";
import PhoneIndicator from "./PhoneIndicator/PhoneIndicator";
import LastNameInp from "./LastNameInp/LastNameInp";
import FirstNameInp from "./FirstNameInp/FirstNameInp";
import Gender from "./Gender/Gender";
import Date from "./Date/Date";
import Region from "./Region/Region";

const fetchLocation = url => fetch(url).then(res => res.json().then(data => data))

const Registration = () => {

    const {data, error} = useSWR(uku + endpoints.location, fetchLocation)

    const router = useRouter()

    const [loading, setLoading] = useRecoilState(requestLoading)
    const [loginState, setLoginState] = useRecoilState(login)
    const [phone] = useRecoilState(phoneNumber)

    console.log(loginState)
    const onChangeForm = (key, value) => {
        console.log(value)
    }

    // if (loginState.is_profile_completed) router.push("/")

    const onSubmitForm = e => {
        e.preventDefault()

    }

    return (
        <div className={styles.registration}>
            <div><h3>Регистрация</h3></div>
            <PhoneIndicator/>
            <form onSubmit={e => onSubmitForm(e)}>
                <LastNameInp/>
                <FirstNameInp/>
                <div>
                    <Gender/>
                    <Date/>
                </div>
                <Region/>
                <div className={styles.check}>
                    <input type="checkbox"/>
                    <span>Принимаю правила программы лояльности</span>
                </div>
                <button>
                    {loading ? <Spinner/> : "Сохранить"}
                </button>
            </form>
        </div>
    )
}

export default Registration;