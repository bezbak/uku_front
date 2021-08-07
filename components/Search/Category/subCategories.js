import {selectedCategory} from "../state";

import {useRecoilState} from "recoil";

const SubCategories = ({subCategory, subCategoryId}) => {

    const [selected, setSelected] = useRecoilState(selectedCategory)

    const nestedCategories = (subCategory && subCategory.children || []).map(subCategory => {
        console.log(subCategory)
        return <SubCategories key={subCategory.id} subCategory={subCategory} subCategoryId={subCategory.id}/>
    })

    return (
        <ul style={{marginLeft: "10px"}}>
            <li style={{"marginLeft": "10px", "marginTop": "10px"}}>{subCategory && subCategory.name}</li>
            {nestedCategories}
        </ul>
    )
}

export default SubCategories;