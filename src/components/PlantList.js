import React from "react";
import PlantCard from "./PlantCard";

function PlantList( { plants }) {

  const plant = plants.map((eachPlant, idx) => {
    return <PlantCard key = {idx} plant = {eachPlant}/>
  })

  return (
    <ul className="cards">{plant}</ul>
  );
}

export default PlantList;
