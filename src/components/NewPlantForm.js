import React, { useState } from "react";

function NewPlantForm({url, onAddNewPlant}) {

  const initialData = {
    name: "",
    price: "",
    image: ""
  }

  const [formData, setFormData] = useState(initialData)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})  
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newPlant = {
      name: formData.name,
      price: formData.price,
      image: formData.image
    }

    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then(onAddNewPlant);
      setFormData(initialData)
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
          name="price" 
          step="0.01" 
          placeholder="Price"
          value={formData.price}
          onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
