import React, { useState, useEffect } from "react";
const url = "http://localhost:6001/plants";

function NewPlantForm({ onAddPlant }) {

  const [form, setForm] = useState({
    name:"",
    image: "",
    price: 0
  })

    // console.log(form)

    const handleSubmit = (e) => {
      e.preventDefault()

      const configurationObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...form}),
      }
  
      fetch(url, configurationObj)
        .then(response => response.json())
        .then(data => {
          onAddPlant(data);
          setForm({
            name:"",
            image: "",
            price: 0
          })
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm( (form) => ({...form, [name]:value}))
    }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form className = "form" onSubmit={handleSubmit} >
        <input 
        type="text" 
        name="name" 
        placeholder="Plant name" 
        onChange={handleChange} 
        value={form.name} />
        
        <input 
        type="text" 
        name="image" 
        placeholder="Image URL" 
        onChange={handleChange} 
        value={form.image}/>

        <input 
        type="number" 
        name="price" 
        step="0.01" 
        placeholder="Price" 
        onChange={handleChange} 
        value={form.price}/>

        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
