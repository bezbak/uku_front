import React, {useEffect, useState} from "react";
import ComponentFavorites from "../Favorites";
import Container from "../../containers";
import {actions} from "../../store/favorites/slice";
import {useDispatch} from "react-redux";


const PageFavorites = () => {
  const dispatch = useDispatch();
  const userAllFavoriteRequest = (payload) => dispatch(actions.userAllFavoriteRequestStart(payload));
  useEffect(()=> {
    userAllFavoriteRequest
  },[])
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <Container>
      <ComponentFavorites title={"Избранное"}/>
    </Container>
  )
}
export default PageFavorites