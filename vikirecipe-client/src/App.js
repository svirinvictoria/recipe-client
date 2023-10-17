import { useProxy } from './hooks/useProxy';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const proxy= useProxy();
  const [collectionJsonObject, setCollectionJsonObject] = useState("Ingredients collection"); 

  useEffect(()=>{
    async function fetchData(){
      const ingredCollection = await proxy.bringIngredPr();//bringing ingredients from the server
      setCollectionJsonObject(ingredCollection)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  // function buttonClickHandler(event){
  //   console.log("button was clicked");

  // }
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Viki recipe - My recipe's book
        </p>
   
      </header>
      <div className='gray'>
        {collectionJsonObject}
        {/* <button onClick={buttonClickHandler}>Click</button> */}
      </div>
    </div>
  );
}

export default App;
