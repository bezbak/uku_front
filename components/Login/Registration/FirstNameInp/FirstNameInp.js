import {registrationForm} from "../../state";
import {useRecoilState} from "recoil";

const FirstNameInp = () => {
    return <input
        placeholder={"Имя*"}
        type="text"
    />
}

export default FirstNameInp;