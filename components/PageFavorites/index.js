import React, {useState} from "react";
import CategoryNavbar from "../CategoryNavbar";
import ComponentAds from "../Ads";
import Container from "../../containers";


const PageFavorites = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <Container>
      <CategoryNavbar  setSelectedCategory={setSelectedCategory}/>
      <ComponentAds/>
    </Container>
  )
}
export default PageFavorites