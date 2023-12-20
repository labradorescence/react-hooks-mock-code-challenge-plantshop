import React, { useState } from "react";

function NewPlantForm( { url, onAddNewPlant }) {

  const initObj = {
    "name": "",
    "image": "",
    "price": 0
  }

  const [ formData, setFormData ] = useState(initObj)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({...formData, [name]:value})
  }

  // console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(newlyAddedPlantInServer => onAddNewPlant(newlyAddedPlantInServer))
      .catch(console.error)
    
    setFormData(initObj)
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange} />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={formData.image}
          onChange={handleChange} />
        <input 
          type="number" 
          name="price" step="0.01" placeholder="Price" 
          value={formData.price}
          onChange={handleChange} />
        <button 
          type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
