import React from "react";
import PlantCard from "./PlantCard";

function PlantList({url, plants, handleEdit, onHandleDelete }) {

  const plant = plants.map((plant) => (
    <PlantCard key={plant.id} plant = {plant} handleEdit={handleEdit} onHandleDelete={onHandleDelete} url ={url}/>
  ))
  return (
    <ul className="cards">{plant}</ul>
  );
}

export default PlantList;
