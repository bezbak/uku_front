import Link from "next/link";

const Favourite = ({state}) => {
    //TODO клик переводит на страницу логина, надо исправить
    return {
        authorized:
            <Link href={"/favourite"}>
                <div>
                    <img src="/icons/heart.png" alt=""/>
                    <span>Избранное</span>
                </div>
            </Link>,
        nonAuthorized:
            <Link href={"/login"}>
                <div>
                    <img src="/icons/heart.png" alt=""/>
                    <p>Избранное</p>
                </div>
            </Link>
    }[state]
}

export default Favourite;

