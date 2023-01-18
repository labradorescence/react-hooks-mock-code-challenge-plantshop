import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
const url = "http://localhost:6001/plants"

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [searchVal, setSearchVal] = useState("")

  const addNewPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  }

  useEffect(()=> {
    fetch(url)
    .then(resp => resp.json())
    .then(data =>  setPlants(data))
  }, [])

  const plantsToDisplay = plants.filter((plant)=> plant.name.toLowerCase().includes(searchVal.toLowerCase()))

  const handleEdit = (updatedPlant)=>{
    const updatedPlantsArr = plants.map((plant) => {
      if(plant.id === updatedPlant.id){
        return updatedPlant
      }else{
        return plant
      }
    })
    setPlants(updatedPlantsArr)
  }

  const deletePlant = (id) => {
    const withoutDeleted = plants.filter((plant)=> {
      return plant.id !==id
    })
    setPlants(withoutDeleted)
  }

  return (
    <main>
      <NewPlantForm 
        url = {url}
        onAddNewPlant={addNewPlant}/>
      <Search 
        searchVal = {searchVal}
        onSearch={setSearchVal}/>
      <PlantList 
        url = {url}
        plants = {plantsToDisplay}
        handleEdit={handleEdit}
        onHandleDelete={deletePlant}/>
    </main>
  );
}

export default PlantPage;
