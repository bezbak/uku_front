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
import {registrationSchema} from "../../../util/schemes";
import {toast} from "react-toastify";
import uku from "../../../util/HTTP_Agent";
import {endpoints} from "../../../api/endpoints";
import DatePicker from 'react-datepicker'
import moment from 'moment'
import * as ru from 'date-fns/locale/ru'
import {registerLocale} from "react-datepicker";
import {modalState} from "../../UI/modalState";
import {useState} from "react";
import LocationModal from "../../UI/Modal/LocationModal";

const Registration = () => {

  registerLocale("ru", ru);
  const router = useRouter()

  const [loading, setLoading] = useRecoilState(requestLoading)
  const [loginState] = useRecoilState(login)
  const [form, setForm] = useRecoilState(registrationForm)
  const [phone] = useRecoilState(phoneNumber)
  const [locationModal, setLocationModal] = useState(false)

  if (loginState.is_profile_completed) router.push("/")

  const options = [
    {value: '', label: 'Выберите пол'},
    {value: 'male', label: 'Мужской'},
    {value: 'female', label: 'Женский'}
  ]

  const onChangeForm = (key, value) => {
    setForm(oldState => ({...oldState, [key]: value}))
  }

  const customStyles = {
    control: base => ({
      ...base,
      height: 35,
      minHeight: 35
    }),
    valueContainer: (provided, state) => {
      const position = "static"
      return {...provided, position};
    }
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
            minMenuHeight={"35px"}
            onChange={({value}) => onChangeForm("gender", value)}
            instanceId={"uniqueid"}
            components={{DropdownIndicator: () => null, IndicatorSeparator: () => null}}
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
        <div className={styles.region}>
          <input
            placeholder={"Выбор региона"}
            onClick={() => setLocationModal(!locationModal)}
            type="text"
            value={form.region.name}
            readOnly={true}
          />
          <LocationModal title="Выбор локации" modal={locationModal} setModal={setLocationModal}
                         setLocation={setForm}/>
        </div>
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