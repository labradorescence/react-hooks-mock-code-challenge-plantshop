import React, { useState } from "react";

function PlantCard( { plant, onDeletePlant, onUpdatePlant } ) {

  const { id, name, price, image } = plant //object destructuring

  const [ isInStock, setIsInStock ] = useState(true)
  const [ updatedPrice, setUpdatedPrice ] = useState(price)

  const handleToggleStock = ( ) => {
    setIsInStock(!isInStock)
  }

  const handleDeleteClick = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
    onDeletePlant(id)
  }

  const handleChange = (e) => {
    setUpdatedPrice(e.target.value)
  }

  const handlePriceSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({ price: updatedPrice})
    })
    .then(resp => resp.json())
    .then(updatedPlant => onUpdatePlant(updatedPlant))
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={handleToggleStock} className="primary">In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
      <form onSubmit = {handlePriceSubmit}>
        <input 
            type="number" 
            name="price" 
            step="0.01" 
            placeholder="Price"
            value={updatedPrice}
            onChange={handleChange}
            />
        <button type="submit"> update price </button>
      </form>
    </li>
  );
}

export default PlantCard;
