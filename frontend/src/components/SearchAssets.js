import React, { useState } from 'react';
import { fetchAssets } from '../services/api';  // Use the API function to search assets
import { Container, Form, Button, Table } from 'react-bootstrap';  // Bootstrap components

const SearchAssets = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    status: '',
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const assets = await fetchAssets(searchParams);  // Pass search parameters
      setResults(assets);
    } catch (err) {
      setError('Failed to search assets');
    }
  };

  return (
    <Container>
      <h1>Search Assets</h1>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="formAssetName">
          <Form.Label>Asset Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter asset name"
            name="name"
            value={searchParams.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAssetCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            name="category"
            value={searchParams.category}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAssetStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={searchParams.status}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Retired">Retired</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Search</Button>
      </Form>

      {error && <p>{error}</p>}
      
      {results.length > 0 && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Serial Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map(asset => (
              <tr key={asset._id}>
                <td>{asset.name}</td>
                <td>{asset.category}</td>
                <td>{asset.status}</td>
                <td>{asset.serialNumber}</td>
                <td>
                  <Button variant="info" onClick={() => navigate(`/assets/update/${asset._id}`)}>Update</Button>
                  <Button variant="danger" onClick={() => handleDelete(asset._id)} className="ml-2">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default SearchAssets;
