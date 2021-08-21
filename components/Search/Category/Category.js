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
            [item.name]: !displayChildren[item.name],
        });
        console.log(displayChildren)
        if (!displayChildren[item.name]) {
            setCreate(old => ({...old, bottomPanel: true}))
        } else {
            setCreate(old => ({...old, bottomPanel: false}))
        }
    }

    const selectedClass = (item) => {
        return cs({
            [styles.selected]: displayChildren[item.name]
        })
    }

    const arrowStyleActive = {
        background: `url(/icons/categoryArrow.png)`,
        transform: "rotate(90deg)",
    }

    const arrowStyleDefault = {
        background: `url(/icons/categoryArrow.png)`
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
                                    style={displayChildren[item.name] ? arrowStyleActive : arrowStyleDefault
                                    }
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