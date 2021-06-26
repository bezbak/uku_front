import React, {useState} from "react";
import CategoryNavbar from "../CategoryNavbar";
import ComponentAds from "../Ads";
import Container from "../../containers";
import {actions} from "../../public/store/category/slice";
import {useDispatch} from "react-redux";


const PageSearch = () => {
  const dispatch = useDispatch();
  const getCategory = () => dispatch(actions.categoryRequestStart());
  getCategory()
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <Container>
      <CategoryNavbar  setSelectedCategory={setSelectedCategory}/>
      <ComponentAds/>
    </Container>
  )
}
export default PageSearch