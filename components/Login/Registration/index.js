import styles from './styles.module.scss'
import Spinner from "../../Spinner/Spinner";
import {useRecoilState} from "recoil";
import {requestLoading} from "../state";
import {phoneNumber} from "../state";
import {login} from "../state";
import {useRouter} from "next/router";
import Region from "./Region/Region";
import Select from "react-select";
import {registrationForm} from '../state'

const Registration = () => {

    const router = useRouter()


    const [loading, setLoading] = useRecoilState(requestLoading)
    const [loginState, setLoginState] = useRecoilState(login)
    const [form, setForm] = useRecoilState(registrationForm)
    const [phone] = useRecoilState(phoneNumber)

    if (loginState.is_profile_completed) router.push("/")

    const options = [
        {value: '', label: 'Выберите пол'},
        {value: 'male', label: 'Мужской'},
        {value: 'female', label: 'Женский'}
    ]

    // console.log(loginState)

    const onChangeForm = (key, value) => {
        setForm(oldState => ({...oldState, [key]: value}))
    }

    // console.log(form)
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
            top: "60%",
            position: 'absolute'
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
                <input type="text"
                       placeholder="Фамилия*"
                       name="last_name"
                       onChange={({target: {value}}) => onChangeForm("last_name", value)}/>
                <input
                    type="text"
                    placeholder="Имя*"
                    name="first_name"
                    onChange={({target: {value}}) => onChangeForm("first_name", value)}
                />
                <div className={styles.group}>
                    <Select
                        options={options}
                        className={"gender"}
                        placeholder={"Выберите пол"}
                        styles={customStyles}
                        onChange={({value}) => onChangeForm("gender", value)}
                        instanceId={"uniqueid"}
                    />
                    <input
                        onChange={({target: {value}}) => onChangeForm("birth_date", value)}
                        placeholder={"Дата рождения (дд.мм.гггг)"}
                        type="text"/>
                </div>
                <Region/>
                <div className={styles.check}>
                    <input
                        onChange={({target: {checked}}) => onChangeForm("checkbox", !checked)}
                        type="checkbox"/>
                    <span>Принимаю правила программы лояльности</span>
                </div>
                <button disabled={form.checkbox}>
                    {loading ? <Spinner/> : "Сохранить"}
                </button>
            </form>
        </div>
    )
}

export default Registration;