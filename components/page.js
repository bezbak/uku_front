import {useDispatch} from 'react-redux'
import Link from "next/link";

export default function Page() {

    const dispatch = useDispatch()

    return (
        <>
            <Link href={"/contacts"}>
                Hello
            </Link>
        </>
    )
}
