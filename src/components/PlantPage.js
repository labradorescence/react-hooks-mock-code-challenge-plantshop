import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
const URL = "http://localhost:6001/plants"

function PlantPage() {

  const [ plantsArr, setPlantsArr ] = useState([])
  const [ searchValStr, setSearchValStr ] = useState("")

  useEffect(() => {
    fetch(URL)
      .then(response =>  response.json())
      .then(pArr => setPlantsArr(pArr))
      .catch(console.error)
  }, [])

  const searchedPlantArr = plantsArr.filter(eachPlant => {
    return eachPlant.name.toLowerCase().includes(searchValStr.toLowerCase())
  })

  const handleAddNewPlant = (newlyAddedPlantObj) => {
    setPlantsArr([...plantsArr, newlyAddedPlantObj])
  }

  const handleSearch = (e) => {
    setSearchValStr(e.target.value)
  }

  const handleDelete = (deletedPlantId) => {
    const plantsArrWODel = plantsArr.filter(eachPlant => {
      return eachPlant.id !== deletedPlantId
    })
    setPlantsArr(plantsArrWODel)
  }

  return (
    <main>
      <NewPlantForm onAddNewPlant={handleAddNewPlant} url={URL}/>
      <Search onHandleSearch={handleSearch}/>
      <PlantList plantsArr = {searchedPlantArr}  url={URL} onHandleDelete={handleDelete}/>
    </main>
  );
}

export default PlantPage;
