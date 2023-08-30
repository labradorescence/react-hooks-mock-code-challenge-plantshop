import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
const API = "http://localhost:6001/plants"

function PlantPage() {

  const [ plants, setPlants ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState("")

  useEffect(() => {
    fetch(API)
      .then(resp => resp.json())
      // .then((plantArr) => setPlants(plantArr))
      .then(setPlants)
  }, [])

  const onHandlingSubmit = (newPlant) => {
    setPlants([...plants, newPlant])
  }

  const onHandleSearch = (searchVal) => {
    setSearchTerm(searchVal)
  }
  console.log(searchTerm)

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const onDeletePlant = (deletedId) => {
    const woDeletedPlant = plants.filter((plant) => plant.id !== deletedId)
   // console.log(woDeletedPlant)
    setPlants(woDeletedPlant)
  }

  const onUpdatePlant = (updatedPlant) => {
    const updatedPlanArr = plants.map((plant) => {
      if(plant.id === updatedPlant.id ){
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlanArr)
  }

  return (
    <main>
      <NewPlantForm 
          API={API} 
          onHandlingSubmit={onHandlingSubmit}/>
      <Search 
          searchTerm={searchTerm}
          onHandleSearch={onHandleSearch}
          />
      <PlantList 
          plants={displayedPlants} 
          onDeletePlant={onDeletePlant}
          onUpdatePlant={onUpdatePlant}/>
    </main>
  );
}

export default PlantPage;
