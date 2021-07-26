import React, {useEffect, useState} from "react";
import ComponentFavorites from "../Favorites";
import Container from "../../containers";
import {actions} from "../../store/favorites/slice";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Cookie from "js-cookie";
const PageFavorites = () => {
  return (
    <Container>
      <ComponentFavorites title={"Избранное"}/>
    </Container>
  )
}
export default PageFavorites