import React from "react";
import PlantCard from "./PlantCard";

function PlantList( { url, plantsArr, onHandleDelete }) {

  const plantC = plantsArr.map((eachPlant) => {
    return <PlantCard plant = {eachPlant} key={eachPlant.id} url={url} onHandleDelete={onHandleDelete}/>
  })
  return (
    <ul className="cards">{plantC}</ul>
  );
}

export default PlantList;
