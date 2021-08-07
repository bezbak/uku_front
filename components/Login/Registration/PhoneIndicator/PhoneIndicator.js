import {phoneNumber} from "../../state";
import {useRecoilState} from "recoil";

const PhoneIndicator = () => {

    const [phone] = useRecoilState(phoneNumber)

    return (<span><input value={phone} type="text" disabled={true}/></span>)
}

export default PhoneIndicator;