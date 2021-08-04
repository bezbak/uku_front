import Link from "next/link";

const Profile = ({state}) => {
    return {
        authorized:
            <Link href={"/myProfile"}>
                <p>АВА</p>
            </Link>,
        nonAuthorized:
            <Link href={"/login"}>
                <div>
                    <img src="/icons/no_avatar.png" alt=""/>
                    <p>Войти</p>
                </div>
            </Link>
    }[state]
}

export default Profile;