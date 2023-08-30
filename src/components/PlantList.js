import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, API, onHandleDelete, onHandleEdit }) {

  const plantCard = plants.map((plant) => {
      return <PlantCard 
                key={plant.id} 
                plant={plant} 
                API = {API} 
                onHandleDelete={onHandleDelete}
                onHandleEdit={onHandleEdit} />
  })

  return (
    <ul className="cards">{plantCard}</ul>
  );
}

export default PlantList;
