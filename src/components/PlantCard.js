import {useState} from "react";

function PlantCard ( { API, plant, onHandleDelete, onHandleEdit })  {

  const { id, image, name, price } = plant
  const [ isInStock, setIsInStock ] = useState(true)

  const handleClick = () => {
    setIsInStock(!isInStock)
  }

  const handleDelete = () => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    })
    onHandleDelete(id)
  }

  const handleEdit = () => {
    onHandleEdit(id)
  }

  return (
    <li className="card">
      <img src={undefined? "https://via.placeholder.com/400": image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick = {handleEdit}> edit </button>
      <button onClick = {handleDelete}> delete </button>
    </li>
  );
}

export default PlantCard;
