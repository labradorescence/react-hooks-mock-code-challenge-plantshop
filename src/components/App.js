import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
const url = "http://localhost:6001/plants";


function App() {

  const [plants, setPlants] = useState([])
  
  //1. GET request  //to render all the plants when the component renders
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPlants(data)
      })
  },[])

  //2-10 POST request
  const onAddPlant = (newPlant) => {
    setPlants((plants) => [...plants, newPlant])
  }

  //4 search
  const onSearch = (searchInput) => {

   plants.forEach((plant) => {
      if(plant.name.includes(searchInput)){
        console.log(plant.name, searchInput)
      }
      // setPlants(() => {})
    })

  }

  return (
    <div className="app">
      <Header />
      <PlantPage 
      plants={plants} onAddPlant={onAddPlant} onSearch={onSearch}/>
    </div>
  );
}

export default App;
