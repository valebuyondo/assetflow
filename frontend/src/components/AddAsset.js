import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAsset } from '../services/api';

const AddAsset = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAsset({ name, description });
      navigate('/assets');  // useNavigate to redirect after adding asset
    } catch (error) {
      console.error('Error adding asset', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Asset</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Asset</button>
    </form>
  );
};

export default AddAsset;
