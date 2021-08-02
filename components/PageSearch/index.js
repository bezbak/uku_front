import React, {useState} from "react";
import CategoryNavbar from "../CategoryNavbar";
import ComponentAds from "../Ads";
import Container from "../../containers";
import {actions} from "../../store/category/slice";
import {useDispatch} from "react-redux";
import UserPublicationEdit from "../PageProfile/UserPublicationEdit";


const PageSearch = () => {
    const dispatch = useDispatch();
    const [addPublicationModal, setAddPublicationModal] = useState(false)
    const getCategory = () => dispatch(actions.categoryRequestStart());
    getCategory()
    const [selectedCategory, setSelectedCategory] = useState();

    return (
        <Container>
            <CategoryNavbar setSelectedCategory={setSelectedCategory}/>
            {!addPublicationModal && <ComponentAds setAddPublicationModal={setAddPublicationModal}/>}
            {
                addPublicationModal && <UserPublicationEdit add={true} setEditPublication={setAddPublicationModal}/>
            }
        </Container>
    )
}
export default PageSearch