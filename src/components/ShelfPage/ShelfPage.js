import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";


function ShelfPage() {
  // useSelector for items
  const items = useSelector(store => store.useItems)

  // useState to set description and image
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemImage, setNewItemImage] = useState("");

  // handleSubmit for submission
  const handleSubmit = () => {
  dispatch({type:"ADD_ITEM", payload: {description: newItemDescription, imgUrl: newItemImage}})

    // clear inputs
    setNewItemDescription("");
    setNewItemImage("");
  };

  return (
    <div className="container">
      <h2>Shelf</h2>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="itemDescription">
          Item Description:
          <input
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            id="itemDescription"
            placeholder="Describe your item"
          />
        </label>
        <label htmlFor="itemImage">
          Item Image:
          <input
            value={newItemImage}
            onChange={(e) => setNewItemImage(e.target.value)}
            id="itemImage"
            placeholder="Add your image"
          />
        </label>
        <br />
        <button type="submit">Add Item</button>
      </form>
      <p>All of the available items can be seen here.</p>
      <div className="display">
        <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <p>{item.description}</p>
              <img src={item.image_url} />
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}

export default ShelfPage;
