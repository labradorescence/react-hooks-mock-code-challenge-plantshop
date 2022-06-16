import React, { useState } from "react";


function NewPlantForm( {url, onAddPlant}) {

  const [form, setForm] = useState({
      name: "",
      image: "",
      price: 0
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((form) => ({...form, [name]:value}))
  }

 console.log(form) 

  //2. POST request
 const handleSubmit = (e) => {
    e.preventDefault()

    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...form}),
    }

    fetch(url, configObj)
      .then(res => res.json())
      .then(data => {
        onAddPlant(data)
        setForm({
          name: "",
          image: "",
          price: 0
        })
      })

 }


  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit = {handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={handleChange} value={form.name}/>
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} value={form.image}/>
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={handleChange} value={form.price}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
