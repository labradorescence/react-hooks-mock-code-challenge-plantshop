import React, { useState } from "react";

function PlantCard( {url, plant, onHandleDelete}) {
  const {id, name, price, image} = plant

  const [ inStock, setInStock ] = useState(true)
  const [ showEditForm, setShowEditForm ] = useState(false)
  const [ newPrice, setNewPrice ] = useState(price)

  const handleClick = () => {
    setInStock(inStock => !inStock)
  }

  const handleDelete = ( ) => {
    fetch(`${url}/${id}`, {
      method:"DELETE"
    })
    .then(response=>response.json())
    .then(console.log("deleted"))
    .catch(console.error)

    onHandleDelete(id)
  }

  const handleEdit = () => {
    setShowEditForm(!showEditForm)
  }

  const handleChange = (e) => {
    setNewPrice(e.target.value)
  }
  console.log(newPrice)

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${url}/${id}`, {
      method:"PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({price: newPrice})
    }) 
      .then(response => response.json())
      .then(newlyUpdatedPlantObj => console.log(newlyUpdatedPlantObj))
      .catch(console.error)
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      
      {showEditForm?
          <form onSubmit={handleSubmit}>
            <label>
              new price:
               <input name="price" value={newPrice} onChange={handleChange}/>
            </label>
          <button type="submit">submit</button>
          </form> : <p> Price: {price} </p> 
      }
      
      <button onClick={handleEdit}>Edit</button> 
      
      <button onClick={handleDelete}>Delete</button>
      {inStock ? (
        <button onClick = {handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick = {handleClick} >Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
