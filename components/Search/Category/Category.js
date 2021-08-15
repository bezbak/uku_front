import styles from './styles.module.scss'
import {useState} from "react";
import cs from 'classnames'
import classNames from "classnames";
import {useRecoilState} from "recoil";
import createWindow from "../../CreatePublication/state";


const Category = ({items}) => {

    const [displayChildren, setDisplayChildren] = useState({})
    const [create, setCreate] = useRecoilState(createWindow)


    const onClickHandler = (item, e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(displayChildren)
        setDisplayChildren({
            ...displayChildren,
            [item.name]: !displayChildren[item.name],
        });
    }

    const selectedClass = (item) => {
        return cs({
            [styles.selected]: displayChildren[item.name]
        })
    }

    return (
        <ul style={{marginLeft: "10px"}} className={styles.category}>
            {items && items.map(item => {
                return (
                    <li
                        key={item.id}
                        onClick={(e) => onClickHandler(item, e)}>
                        <div className={classNames(styles.catBody, selectedClass(item))}>
                            {item.image ? <img src={item.image} alt=""/> : null}
                            {item.name}{' '}
                            {item.children && (
                                <button
                                    className={styles.btn}
                                    style={displayChildren[item.name] ?
                                        {
                                            background: `url(/icons/categoryArrow.png)`,
                                            transform: "rotate(90deg)",
                                        } :
                                        {background: `url(/icons/categoryArrow.png)`}}
                                />
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