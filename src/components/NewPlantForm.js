import React, { useState } from "react";

function NewPlantForm( { API, onHandlingSubmit }) {

  const initialForm = {
    name: "",
    image: "",
    price: 0
  }

  const [ formData, setFormData ] = useState(initialForm)

  const handleChange = (e) => {
    //e.target.value
    //e.target.name
    const {name, value}  = e.target

    setFormData({...formData, [name]: value})
  }

  console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(data => onHandlingSubmit(data))
    //.then(onHandlingSubmit)

    setFormData(initialForm)
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
          onChange={handleChange}
          />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
           />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
