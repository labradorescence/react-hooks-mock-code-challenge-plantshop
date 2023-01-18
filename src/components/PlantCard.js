import React, { useState } from "react";

function PlantCard({url, plant, handleEdit, onHandleDelete}) {

  const [inStock , setInStock] = useState(true)
  const [newprice, setNewprice] = useState("")

  const {id, name, image, price} = plant

  const handleStockBtn = () => {
    setInStock(() => !inStock)
  }

  const handlePriceChange = (e) => {
    setNewprice(e.target.value)
  }

  const handlePriceSubmit = (e) => {
    e.preventDefault()

    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({price: newprice}),
      })
        .then((response) => response.json())
        .then((updatedPlant) => handleEdit(updatedPlant)); //response data is updated plant object, not only the price! hooray!
        setNewprice("")
  }

  const handleDelete = () => {

    fetch(`${url}/${id}`, {
      method: 'DELETE', 
    })

    onHandleDelete(id)
     
  }


  return (
    <li className="card">
      <img src={image? image: "https://via.placeholder.com/400"} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
          {inStock ? (
            <button onClick={handleStockBtn}className="primary">In Stock</button>
          ) : (
            <button onClick={handleStockBtn}>Out of Stock</button>
          )}
      <button onClick={() => handleDelete(plant)}>delete</button>
      <form onSubmit={handlePriceSubmit}>
        <label>New Price</label>
        <input
          type="text"
          name="newprice"
          value={newprice}
          onChange={handlePriceChange}
        >
        </input>
        <input type="submit" value="edit"></input>
      </form>
    </li>
  );
}

export default PlantCard;
