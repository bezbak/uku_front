import React, {useState} from "react";
import classNames from 'classnames'
import Button from "../../Button";
import SelectIcon from '../../../public/icons/ArrowIcon.svg'
import styles from './styles.module.scss'

const Select = ({input,className,title, options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue]= useState(title);
  input.onChange(selectedValue);
  const Selected = (optionValue) =>{
    optionValue==="Женскиий" ? setSelectedValue('female'): setSelectedValue('male')
    setIsOpen(false);
  }
  return (
    <div className={styles.select}>
      <Button onClick={()=>setIsOpen(!isOpen)}
              className={classNames(styles.select__button,className,{[styles.select__button__collapsed]:isOpen})}>
        <span>
          {selectedValue}
        </span>
        <SelectIcon/>

      </Button>
      <div className={classNames(styles.select__optionsBox,{[styles.select__optionsBox__isOPen]:isOpen})}>
        {options?.map(option=>{
          return (
            <span onClick={()=>Selected(option)} className={styles.select__options}>
              {option}
            </span>
          )
        })}
      </div>
    </div>
  )
}
export default Select;