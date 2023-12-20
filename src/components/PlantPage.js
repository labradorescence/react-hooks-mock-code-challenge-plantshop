import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
const url = "http://localhost:6001/plants"

function PlantPage() {

  const [ plantsArr, setPlantsArr] = useState([])
  const [ searchVal, setSearchVal ] = useState("")


  useEffect(() => {
    fetch(url)
    .then(response=>response.json())
    .then(data => setPlantsArr(data))
    .catch(console.error)
  }, [])

 // console.log(plantsArr)

  const searchedPlantArr = plantsArr.filter(eachPlant => {
    return eachPlant.name.toLowerCase().includes(searchVal.toLowerCase())
  })

  //console.log(searchedPlantArr)

  const addNewPlant = (newlyAddedPlant) => {
    setPlantsArr([...plantsArr, newlyAddedPlant])
  }

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
  }



  const handleDelete = (deletedPlantId) => {
    const plantsArrWOdelted = plantsArr.filter(eachPlant => {
      return eachPlant.id !== deletedPlantId
    }) 
   setPlantsArr(plantsArrWOdelted)
  } 



  return (
    <main>
      <NewPlantForm url={url} onAddNewPlant={addNewPlant}/>
      <Search onSearch={handleSearch}/>
      <PlantList plantsArr={searchedPlantArr} url={url} onHandleDelete={handleDelete}/>
    </main>
  );
}

export default PlantPage;
