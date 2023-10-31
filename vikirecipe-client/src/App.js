import { useProxy } from "./hooks/useProxy";
import { NavLink } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const proxy = useProxy();

  // const [brkfstRecipes, setBrkfstRecipes] = useState([]); //list of recipes for breakfast
  // const [lnchRecipes, setLnchRecipes] = useState([]); //list of recipes for lunch
  // const [dnnrRecipes, setDnnrRecipes] = useState([]); //list of recipes for dinner
  const [collectionCategories, setCollectionCategories] = useState([]); //categories of dishes
  const [collectionRecipes, setCollectionRecipes] = useState([]);
  const [collectionRecipesElem, setCollectionRecipesElem] = useState([]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line
  }, [collectionCategories]);

  useEffect(() => {
    convertRecipesToElements();
    // eslint-disable-next-line
  }, [collectionRecipes]);

  async function fetchCategories() {
    const categCollection = await proxy.bringCategoriesPr(); //bringing categories from DB
    setCollectionCategories(categCollection);
  }

  async function fetchRecipes() {
    const recipesArray = [];
    for (let i = 0; i < collectionCategories.length; i++) {
      const categ = collectionCategories[i];
      const recipesList = await proxy.bringRecipesPr(categ.name); //bringing list of recipes per category from DB
      recipesArray.push(recipesList);
    }
    setCollectionRecipes(recipesArray);
  }

  // function buttonClickHandler(event) {
  //   console.log("button was clicked");
  // }

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

  function convertRecipesToElements() {
    const listRecipesAsElements = [];
    for (let i = 0; i < collectionRecipes.length; i++) {
      const currentObjList = collectionRecipes[i];
      const currentElementList = fillRecipes(currentObjList);
      listRecipesAsElements.push(currentElementList);
    }
    console.log("convertRecipesToElements", listRecipesAsElements);
    setCollectionRecipesElem(listRecipesAsElements);
  }

  function fillRecipes(param) {
    const elements = param.map((item, index) => {
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
      <div className="inner-box">
        <div className="rcp-list">
          <h2 className="list__heading">
            {collectionCategories.map((item, index) => {
              return (
                <div key={index}>
                  <div >{item.name}</div>
                  <div className="rcp__box">{collectionRecipesElem[index]}</div>
                </div>
              );
            })}
          </h2>
          <div></div>
        </div>
        {/* <div className="lnch-list">
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
*/}
      </div>
    </div>
  );
}

export default App;
