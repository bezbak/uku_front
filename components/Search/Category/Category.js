import useSWR from "swr";
import uku from '/adapters/HTTP_Agent'
import {endpoints} from "../../../api/endpoints";
import styles from './styles.module.scss'
import {useRecoilState} from "recoil";
import {selectedCategory} from "../state";
import SubCategories from './subCategories'
import {toast} from "react-toastify";
import {useState} from "react";

const fetchCategories = url => fetch(url).then(res => res.json().then(data => data))

const Category = () => {
    const {data, error} = useSWR(uku + endpoints.categories, fetchCategories)
    // const [selected, setSelected] = useRecoilState(selectedCategory)
    const [selected, setSelected] = useState(false)

    console.log(selected)


    return (
        <div className={styles.category}>
            <h2>Категория</h2>
            <ul>
                {data && data.map(item => {
                    return <li
                        className={styles.categoryTitle}
                        key={item.id}
                        onClick={() => setSelected(item.id)}
                    >
                        <div className={styles.categoryHead}>
                            <div className={styles.categoryBody}>
                                <img width={"24px"} height={"24px"}
                                     src={item.image || ""}
                                     alt=""/>
                                {item.name}
                            </div>
                            <img
                                src="/icons/categoryArrow.png" alt=""/>
                        </div>
                        {item.children.map(child => {
                            return <SubCategories key={child.id} subCategory={child} selected={selected}/>
                        })}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Category;