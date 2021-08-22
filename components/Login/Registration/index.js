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
import {registrationSchema} from "../../../adapters/schemes";
import {toast} from "react-toastify";
import uku from "../../../adapters/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";
import DatePicker from 'react-datepicker'
import moment from 'moment'
import * as ru from 'date-fns/locale/ru'
import {registerLocale} from "react-datepicker";
import {modalState} from "../../UI/modalState";

const Registration = () => {

    registerLocale("ru", ru);
    const router = useRouter()


    const [loading, setLoading] = useRecoilState(requestLoading)
    const [loginState, setLoginState] = useRecoilState(login)
    const [form, setForm] = useRecoilState(registrationForm)
    const [phone] = useRecoilState(phoneNumber)
    const [modal, setModal] = useRecoilState(modalState)

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
        registrationSchema.isValid({
            first_name: form.first_name,
            last_name: form.last_name,
            gender: form.gender,
            birth_date: form.birth_date,
            region: form.region.id
        }).then(valid => {
            if (valid) {
                setLoading(true)
                fetch(uku + endpoints.accountPatch, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${loginState.token}`
                    },
                    body: JSON.stringify({
                        first_name: form.first_name,
                        last_name: form.last_name,
                        gender: form.gender,
                        birth_date: moment(form.birth_date).format("YYYY-MM-DD"),
                        region: form.region.id
                    })
                }).then(response => response.json().then(data => {
                    setLoading(false)
                    console.log(data)
                    if (response.status === 200) {
                        router.push("/")
                    }
                })).catch(err => {
                    setLoading(false)
                    toast.error(err.message)
                })
            }
        })
        registrationSchema.validate({
            first_name: form.first_name,
            last_name: form.last_name,
            gender: form.gender,
            birth_date: form.birth_date,
            region: form.region.id
        }).catch(err => toast.error("Введите корректные данные"))
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
                    <DatePicker
                        selected={form.birth_date}
                        onChange={(date) => setForm(old => ({...old, birth_date: date}))}
                        peekNextMonth
                        showMonthDropdown
                        locale={ru}
                        showYearDropdown
                        dropdownMode="select"
                    />
                </div>
                {/*Region picker*/}
                <Region
                    modal={modal}
                    setModal={setModal}
                    form={form}/>
                <div className={styles.check}>
                    <input
                        onChange={({target: {checked}}) => onChangeForm("checkbox", !checked)}
                        type="checkbox"/>
                    <span>Принимаю правила программы лояльности</span>
                </div>
                <button disabled={form.checkbox} className={styles.regButton}>
                    {loading ? <Spinner/> : "Сохранить"}
                </button>
            </form>
        </div>
    )
}

export default Registration;