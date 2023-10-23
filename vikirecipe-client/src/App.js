import { useProxy } from "./hooks/useProxy";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const proxy = useProxy();
  const [collectionJsonObject, setCollectionJsonObject] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ingredCollection = await proxy.bringIngredPr(); //bringing ingredients from the server
      setCollectionJsonObject(ingredCollection);
      // console.log( ingredCollection);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  function buttonClickHandler(event) {
    console.log("button was clicked");
  }

  const collectionReactElements = collectionJsonObject.map((item, index) => {
    return <div key={index} className="collection-style">{item.name}</div>;
  });


  return (
    <div className="App">
      <header className="App-header">
        <p>Viki recipe - My recipe's book</p>
      </header>
      <div className="gray">
        {collectionReactElements}
        <button onClick={buttonClickHandler}>Click</button>
      </div>
    </div>
  );
}

export default App;
