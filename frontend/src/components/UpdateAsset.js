import React, { useEffect, useState } from 'react';
import { updateAsset, fetchAssetById } from '../services/api';  // API functions
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAsset = () => {
  const { id } = useParams();  // Get asset ID from URL
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAsset = async () => {
      try {
        const data = await fetchAssetById(id);  // Fetch the asset by ID
        setFormData(data);  // Populate form with existing asset data
        setLoading(false);
      } catch (err) {
        setError('Failed to load asset');
        setLoading(false);
      }
    };
    getAsset();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAsset(id, formData);  // Call the API to update the asset
      navigate('/assets');  // Redirect to asset list after success
    } catch (err) {
      setError('Failed to update asset');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
      </div>
      {/* Other form fields for updating asset details */}
      <button type="submit">Update Asset</button>
    </form>
  );
};

export default UpdateAsset;
