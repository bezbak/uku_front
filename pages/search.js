import Meta from "../components/Meta";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageSearch from "../components/PageSearch";

function Search() {
  return (
    <>
      <Meta/>
      <main className="home">
        <Header/>
        <Nav/>
        <PageSearch/>
        <Footer className={"footer"}/>
      </main>
    </>
  )
}

export default Search