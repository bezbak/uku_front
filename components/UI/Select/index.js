import React, {useState} from "react";
import classNames from 'classnames'
import Button from "../../Button";
import SelectIcon from '../../../public/icons/ArrowIcon.svg'
import styles from './styles.module.scss'

const Select = ({input,className,title, options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue]= useState('');
  // input.onChange(selectedValue);
  const Selected = (optionValue) =>{
    setSelectedValue(optionValue)
    optionValue==="Женскиий" ? input.onChange('female'):  input.onChange('male');
    setIsOpen(false);
  }
  return (
    <div className={styles.select}>
      <Button onClick={()=>setIsOpen(!isOpen)}
              className={classNames(styles.select__button,className,{[styles.select__button__collapsed]:isOpen})}>
            <span className= {classNames({[styles.select__button_selectedColor]:selectedValue!==''})}>
          {selectedValue ? selectedValue :title}
        </span>
        <SelectIcon/>

      </Button>
      <div className={classNames(styles.select__optionsBox,{[styles.select__optionsBox__isOPen]:isOpen})}>
        {options?.map((option,index)=>{
          return (
            <span key={index} onClick={()=>Selected(option)} className={styles.select__options}>
              {option}
            </span>
          )
        })}
      </div>
    </div>
  )
}
export default Select;