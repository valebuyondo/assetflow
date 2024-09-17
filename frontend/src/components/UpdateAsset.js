import React, { useEffect, useState } from 'react';
import { fetchAsset, updateAsset } from '../services/api';  // Import API functions
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const UpdateAsset = () => {
  const { id } = useParams();  // Get asset ID from URL params
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    serialNumber: '',
    purchasePrice: '',
    purchaseDate: '',
    currentValue: '',
    residualValue: '',
    usefulLife: '',
    status: 'Available',
    condition: 'Good',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the existing asset details
  useEffect(() => {
    const getAsset = async () => {
      try {
        const assetData = await fetchAsset(id);  // Fetch asset by ID
        setFormData(assetData);  // Populate form with asset data
        setLoading(false);
      } catch (err) {
        setError('Failed to load asset details');
        setLoading(false);
      }
    };
    getAsset();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for updating the asset
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAsset(id, formData);  // Call API to update the asset
      navigate('/assets');  // Redirect to assets list after success
    } catch (err) {
      setError('Failed to update asset');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-5">
      <h1>Update Asset</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAssetName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAssetCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAssetSerialNumber">
          <Form.Label>Serial Number</Form.Label>
          <Form.Control
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Add other form fields for purchase price, purchase date, etc. */}
        <Button variant="primary" type="submit">
          Update Asset
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateAsset;
