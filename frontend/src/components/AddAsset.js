import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAsset } from '../services/api'; // Assuming this API call is ready
import './styles/AddAsset.css'; // Assuming you’ll style this with external CSS

const AddAsset = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    serialNumber: '',
    model: '',
    manufacturer: '',
    purchaseDate: '',
    purchasePrice: '',
    currentValue: '',
    residualValue: '',
    usefulLife: '',
    depreciationMethod: 'Straight Line',
    location: '',
    status: 'Available',
    condition: 'Good'
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  // Log the data being sent
    try {
      await addAsset(formData);  // Send the data to the backend
      alert('Asset added successfully');
      navigate('/assets');  // Redirect on success
    } catch (err) {
      setError('Failed to add asset');
    }
  };
  return (
    <div className="add-asset-container">
      <h1>Add New Asset</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="add-asset-form">
        
        {/* Collapsible Section 1: Basic Information */}
        <fieldset className="fieldset">
          <legend>Basic Information</legend>
          <div className="form-row">
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Category:
              <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Sub-Category:
              <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} />
            </label>
            <label>
              Serial Number:
              <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
            </label>
          </div>
        </fieldset>

        {/* Collapsible Section 2: Purchase Details */}
        <fieldset className="fieldset">
          <legend>Purchase Details</legend>
          <div className="form-row">
            <label>
              Purchase Date:
              <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required />
            </label>
            <label>
              Purchase Price:
              <input type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Current Value:
              <input type="number" name="currentValue" value={formData.currentValue} onChange={handleChange} required />
            </label>
            <label>
              Residual Value:
              <input type="number" name="residualValue" value={formData.residualValue} onChange={handleChange} />
            </label>
            <label>
            manufacturer
              <input type="number" name="manufacturer" value={formData.residualValue} onChange={handleChange} />
            </label>
            <label>
              Model:
              <input type="number" name="model" value={formData.residualValue} onChange={handleChange} />
            </label>
          </div>
        </fieldset>

        {/* Collapsible Section 3: Depreciation Details */}
        <fieldset className="fieldset">
          <legend>Depreciation Details</legend>
          <div className="form-row">
            <label>
              Useful Life (in years):
              <input type="number" name="usefulLife" value={formData.usefulLife} onChange={handleChange} />
            </label>
            <label>
              Depreciation Method:
              <select name="depreciationMethod" value={formData.depreciationMethod} onChange={handleChange}>
                <option value="Straight Line">Straight Line</option>
                <option value="Declining Balance">Declining Balance</option>
                <option value="Sum of Years Digits">Sum of Years Digits</option>
                <option value="Units of Production">Units of Production</option>
              </select>
            </label>
          </div>
        </fieldset>

        {/* Collapsible Section 4: Asset Location & Status */}
        <fieldset className="fieldset">
          <legend>Location & Status</legend>
          <div className="form-row">
            <label>
              Location:
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </label>
            <label>
              Status:
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Retired">Retired</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Condition:
              <select name="condition" value={formData.condition} onChange={handleChange}>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </label>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">Add Asset</button>
      </form>
    </div>
  );
};

export default AddAsset;
