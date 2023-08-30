import { useState, useEffect } from "react";

function EditPlant( { API, plantId, completeEditing, onEditingPlant} ) {

  const initialForm = {
    name:"",
    image: "",
    price: 0
  }

  const [ formData, setFormData ] = useState(initialForm)

  useEffect(() => {
    fetch(`${API}/${plantId}`)
        .then(resp => resp.json())
        .then(data => {
            setFormData(data)
        })
    }, [plantId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${API}/${plantId}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(data => onEditingPlant(data))

    setFormData(initialForm)
    completeEditing()
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>

        <input 
          type="text" 
          name="name" 
          placeholder="Plant name"
          onChange={handleChange}
          value={formData.name} />

        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          onChange={handleChange}
          value={formData.image}
          />

        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          onChange={handleChange}
          value={FormData.price}
          />
          
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default EditPlant;
