import styles from './styles.module.scss'
import {useState} from "react";


const Category = ({items}) => {

    const [displayChildren, setDisplayChildren] = useState({})

    const onClickCategory = arg => {
        if (arg.children.length === 0) {
            console.log("selected")
        }
    }

    console.log(displayChildren)
    return (
        <ul style={{marginLeft: "10px"}} className={styles.category}>
            {items && items.map(item => {
                return (
                    <li key={item.id} onClick={() => onClickCategory(item)}>
                        <div className={styles.catBody}>
                            {item.image ? <img src={item.image} alt=""/> : null}
                            {item.name}{' '}
                            {item.children && (
                                <button
                                    className={styles.btn}
                                    onClick={() => {
                                        console.log(displayChildren)
                                        setDisplayChildren({
                                            ...displayChildren,
                                            [item.name]: !displayChildren[item.name],
                                        });
                                    }}
                                    style={displayChildren[item.name] ?
                                        {background: `url(/icons/categoryArrow.png)`, transform: "rotate(90deg)"} :
                                        {background: `url(/icons/categoryArrow.png)`}}
                                >
                                </button>
                            )}
                        </div>
                        {displayChildren[item.name] && item.children && <Category items={item.children}/>}
                    </li>
                );
            })}
        </ul>
    )
}

export default Category;