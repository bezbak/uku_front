import React, {useState} from "react";
import CategoryNavbar from "../CategoryNavbar";
import ComponentFavorites from "../Favorites";
import Container from "../../containers";
import {actions} from "../../store/favorites/slice";


const PageFavorites = () => {
  const userAllFavoriteRequest = (payload) => dispatch(actions.userAllFavoriteRequestStart(payload));
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <Container>
      <CategoryNavbar  setSelectedCategory={setSelectedCategory}/>
      <ComponentFavorites/>
    </Container>
  )
}
export default PageFavorites