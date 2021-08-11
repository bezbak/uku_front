import {useState} from "react";

const SubCategories = ({subCategory, subCategoryId, selected}) => {

    const [state, setState] = useState(false)

    const nestedCategories = (subCategory && subCategory.children || []).map(subCategory => (
        <SubCategories
            key={subCategory.id}
            subCategory={subCategory}
            subCategoryId={subCategory.id}/>))

    return (
        <ul style={{marginLeft: "10px"}} onClick={e => {
            e.stopPropagation()
            console.log(subCategory)
        }}>
            <li
                style={{"marginLeft": "10px", "marginTop": "10px"}}>
                {subCategory && subCategory.name}
            </li>
            {nestedCategories}
        </ul>
    )
}

export default SubCategories;