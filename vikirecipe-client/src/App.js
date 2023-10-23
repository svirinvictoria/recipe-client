import { useProxy } from "./hooks/useProxy";
import { NavLink } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const proxy = useProxy();
  const [collectionJsonObject, setCollectionJsonObject] = useState([]);
  const [collectionCategories, setCollectionCategories]=useState([]);

  useEffect(() => {
    async function fetchData() {

      const categCollection = await proxy.bringCategoriesPr();//bringing categories from DB
      setCollectionCategories(categCollection);
      // const ingredCollection = await proxy.bringIngredPr(); //bringing ingredients from the server
      // setCollectionJsonObject(ingredCollection);
      console.log( categCollection);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  function buttonClickHandler(event) {
    console.log("button was clicked");
  }

  // const collectionReactElements = collectionJsonObject.map((item, index) => {
  //   return <div key={index} className="collection-style">{item.name}</div>;
  // });

  const categoriesReactElements = collectionCategories.map((item, index)=>{
    return(
      <NavLink
      style={{ textDecoration: "none", color: "white" }}
          key={index}
          className="categ-button"
          to={"/"+item.name}>
            <div>{item.name}</div>
      </NavLink>
    )
  })


  return (
    <div className="App">
      <header className="App-header">
        <p>Viki recipe - My recipe's book</p>
        <p className="hp-intro">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
        <div className="categ-box"> {categoriesReactElements}</div>
      </header>
      <div className="gray">
       
        <button onClick={buttonClickHandler}>Click</button>
      </div>
    </div>
  );
}

export default App;
