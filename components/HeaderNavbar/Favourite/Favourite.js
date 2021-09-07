import Link from "next/link";
import {useRouter} from "next/router";

const Favourite = ({state}) => {

    const router = useRouter()

    return {
      authorized:
        <Link href={"/favourite"}>
          <div>
            {router.asPath === "/favourite" ? <img src="/icons/heartSelected.png" alt=""/> :
              <img src="/icons/heart.png" alt=""/>}
            <span style={router.asPath === "/favourite" ? {color: "#E56366"} : {}}>Избранное</span>
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

