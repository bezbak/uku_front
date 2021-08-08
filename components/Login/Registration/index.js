import styles from './styles.module.scss'
import Spinner from "../../Spinner/Spinner";
import {useRecoilState} from "recoil";
import {requestLoading} from "../state";
import {phoneNumber} from "../state";
import {login} from "../state";
import {useRouter} from "next/router";
import Region from "./Region/Region";
import Select from "react-select";

const Registration = () => {

    const router = useRouter()


    const [loading, setLoading] = useRecoilState(requestLoading)
    const [loginState, setLoginState] = useRecoilState(login)
    const [phone] = useRecoilState(phoneNumber)

    if (loginState.is_profile_completed) router.push("/")

    const options = [
        {value: '', label: 'Выберите пол'},
        {value: 'male', label: 'Мужской'},
        {value: 'female', label: 'Женский'}
    ]

    // console.log(loginState)

    const onChangeForm = (key, value) => {
        console.log(value)
    }

    const customStyles = {
        control: base => ({
            ...base,
            height: 40,
            minHeight: 40,
            borderColor: "#E6EFF9"
        }),
        valueContainer: base => ({
            ...base,
            height: 40,
            minHeight: 40,
        }),
        singleValue: base => ({
            ...base,
            top: 35
        }),
        placeholder: base => ({
            ...base,
            top: "50%",
            position: 'relative'
        })
    };


    const onSubmitForm = e => {
        e.preventDefault()

    }

    return (
        <div className={styles.registration}>
            <div><h3>Регистрация</h3></div>
            <form className={styles.form} onSubmit={e => onSubmitForm(e)}>
                <input value={phone} type="text" disabled={true}/>
                <input type="text" placeholder="Фамилия*" name="last_name"/>
                <input type="text" placeholder="Имя*" name="first_name"/>
                <div className={styles.group}>
                    <Select
                        options={options}
                        className={"gender"}
                        placeholder={"Выберите пол"}
                        styles={customStyles}
                        onChange={({value}) => console.log(value)}
                        instanceId={"uniqueid"}
                    />
                    <input
                        placeholder={"Дата рождения"}
                        type="text"/>
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