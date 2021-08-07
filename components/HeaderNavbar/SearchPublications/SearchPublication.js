import Link from "next/link";

const SearchPublication = () => {
    return (
        <div>
            <Link href={"/search"}>
                <div>
                    <img src="/icons/search.png" alt=""/>
                    <span>Поиск</span>
                </div>
            </Link>
        </div>
    )
}

export default SearchPublication;