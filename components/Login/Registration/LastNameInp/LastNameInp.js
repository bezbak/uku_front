import {registrationForm} from "../../state";
import {useRecoilState} from "recoil";

const LastNameInp = () => {

    const [form,setForm] = useRecoilState(registrationForm)

    return <input
        placeholder={"Фамилия*"}
        type="text"/>
}

export default LastNameInp;