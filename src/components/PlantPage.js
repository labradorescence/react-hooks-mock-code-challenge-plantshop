import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
const url = "http://localhost:6001/plants";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [searchInput, setSearchInput] = useState("zz")
  
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
  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchInput.toLowerCase())
  })

  return (
    <main>
      <NewPlantForm onAddPlant = { onAddPlant }/>
      <Search searchInput={searchInput} onSearch={setSearchInput}/>
      <PlantList plants={ displayedPlants}/>
    </main>
  );
}

export default PlantPage;