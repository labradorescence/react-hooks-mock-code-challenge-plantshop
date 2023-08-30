import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import EditPlant from "./EditPlant"
import PlantList from "./PlantList";
import Search from "./Search";
const API = "http://localhost:6001/plants"

function PlantPage() {

  const [ plants, setPlants ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ plantId, setPlantId ] = useState(null)

  useEffect(() => {
    fetch(API)
      .then(resp => resp.json())
      .then(data => setPlants(data))
  }, [])

  const onHandleSearchTerm = (term) => {
    setSearchTerm(term)
  }

  const plantsToDisplay = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const onHandlingSubmit = ( newPlant ) => {
    setPlants([...plants, newPlant])
  }

  const onEditingPlant = (editedPlant) => {
    const wEditedPlant = plants.map((plant) => {
      if(plant.id === editedPlant.id){
        return editedPlant
      } else{
        return plant
      }
    })
  
    setPlants(wEditedPlant)
  }

  const onHandleDelete = (deletedId) => {
    const woDeleted = plants.filter((plant) => {
      return plant.id !== deletedId
    })
    setPlants(woDeleted)
  }

  const onHandleEdit = (onEditingId) => {
    setPlantId(onEditingId)
  }

  const completeEditing = () => {
    setPlantId(null)
  }

  return (
    <main>
      {plantId? 
        <EditPlant 
          plantId={plantId}
          completeEditing={completeEditing}
          onEditingPlant={onEditingPlant}
          API={API}
          />
      : <NewPlantForm 
              onHandlingSubmit={onHandlingSubmit}
              API={API}/>}
      <Search searchTerm = {searchTerm} 
              onHandleSearchTerm = {onHandleSearchTerm} />
      <PlantList plants={plantsToDisplay}
              API = {API} 
              onHandleDelete={onHandleDelete}
              onHandleEdit = {onHandleEdit}
              />
    </main>
  );
}

export default PlantPage;
