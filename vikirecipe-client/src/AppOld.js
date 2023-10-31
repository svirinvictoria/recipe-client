import { useProxy } from "./hooks/useProxy";
import { NavLink } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function App() {
  const proxy = useProxy();
  const params = useParams();
  const [brkfstRecipes, setBrkfstRecipes] = useState([]); //list of recipes for breakfast
  const [lnchRecipes, setLnchRecipes] = useState([]); //list of recipes for lunch
  const [dnnrRecipes, setDnnrRecipes] = useState([]); //list of recipes for dinner
  const [collectionCategories, setCollectionCategories] = useState([]); //categories of dishes

  useEffect(() => {
    async function fetchData() {
      const categCollection = await proxy.bringCategoriesPr(); //bringing categories from DB
      setCollectionCategories(categCollection);

      // const ingredCollection = await proxy.bringIngredPr(); //bringing ingredients from the server
      // setCollectionJsonObject(ingredCollection);

      const brkfstCollection = await proxy.bringRecipesPr(
        params.categories ? params.categories : "breakfest"
      ); //bringing list of recipes from DB
      setBrkfstRecipes(brkfstCollection);

      const lnchCollection = await proxy.bringRecipesPr(
        params.categories ? params.categories : "lunch"
      );
      setLnchRecipes(lnchCollection);

      const dnnrCollection = await proxy.bringRecipesPr(
        params.categories ? params.categories : "dinner"
      );
      setDnnrRecipes(dnnrCollection);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  // console.log(brkfstRecipes);
  function buttonClickHandler(event) {
    console.log("button was clicked");
  }

  // const collectionReactElements = collectionJsonObject.map((item, index) => {
  //   return <div key={index} className="collection-style">{item.name}</div>;
  // });

  const categoriesReactElements = collectionCategories.map((item, index) => {
    return (
      <NavLink
        style={{ textDecoration: "none", color: "white" }}
        key={index}
        className="categ-button"
        to={"/" + item.name}
      >
        <div>{item.name}</div>
      </NavLink>
    );
  });
  function fillRecipes(param){
    const elements = param.map((item, index) => {
      if (item.rating === 5) {
        return (
          <div key={index} className="rcp-mini-box">
            <div className="rcp-picture"></div>
            <div className="rcp-name">{item.name}</div>
            <div className="rcp-shrt-descr">{item.shortDescription}</div>
            <NavLink
              style={{ color: "black" }}
              key={index}
              className="rcp-link"
              to={"/" + item.name}
            >
              <div>more</div>
            </NavLink>
          </div>
        );
        }
    });
    return elements;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Viki recipe - My recipe's book</p>
        <p className="hp-intro">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum.
        </p>
        <div className="categ-box"> {categoriesReactElements}</div>
      </header>
      <div className="gray">
        <div className="brkfst-list">
          <h2 className="list__heading">breakfast</h2>
          <div>
            <div className="brkfst__box">{fillRecipes(brkfstRecipes)}</div>
          </div>
        </div>
        <div className="lnch-list">
          <h2 className="list__heading">Lunch</h2>
          <div>
            <div className="brkfst__box">{fillRecipes(lnchRecipes)}</div>
          </div>
        </div>
        <div className="dnnr-list">
          <h2 className="list__heading">Dinner</h2>
          <div>
            <div className="brkfst__box">{fillRecipes(dnnrRecipes)}</div>
          </div>
        </div>

        <button onClick={buttonClickHandler}>Click</button>
      </div>
    </div>
  );
}

export default App;