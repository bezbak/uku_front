import Link from "next/link";
import {useRouter} from "next/router";

const SearchPublication = () => {

    const router = useRouter()

    return (
        <div>
            <Link href={"/search"}>
                <div>
                    {router.asPath === "/search" ? <img src="/icons/searchSelected.png" alt=""/> :
                        <img src="/icons/search.png" alt=""/>}
                    <span style={router.asPath === "/search" ? {color: "#E56366"} : {}}>Поиск</span>
                </div>
            </Link>
        </div>
    )
}

export default SearchPublication;