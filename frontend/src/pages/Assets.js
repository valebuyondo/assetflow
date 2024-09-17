import React, { useEffect, useState } from 'react';
import { fetchAssets, deleteAsset } from '../services/api';  // Import deleteAsset API function
import { Table, Container, Button } from 'react-bootstrap';  // Import Bootstrap components
import { useNavigate } from 'react-router-dom';  // Use to navigate to the update page

const Assets = () => {
  const [assets, setAssets] = useState([]);  // Initialize assets as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch assets on component mount
  useEffect(() => {
    const getAssets = async () => {
      try {
        const data = await fetchAssets();  // Fetch data from API
        setAssets(data);  // Set fetched data to assets
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assets');
        setLoading(false);
      }
    };

    getAssets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await deleteAsset(id);  // Call API to delete the asset
        setAssets(assets.filter((asset) => asset._id !== id));  // Remove asset from the state
      } catch (err) {
        setError('Failed to delete asset');
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;  // Loading indicator
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;  // Error message

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Assets</h1>
      {assets.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Serial Number</th>
              <th>Purchase Date</th>
              <th>QR Code</th>
              <th>Actions</th>  {/* Add Actions column */}
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset._id}>
                <td>{asset.name}</td>
                <td>{asset.category}</td>
                <td>{asset.serialNumber}</td>
                <td>{new Date(asset.purchaseDate).toLocaleDateString()}</td>
                <td>
                  <img src={asset.qrCode} alt={`QR Code for ${asset.name}`} style={{ width: '50px' }} />
                </td>
                <td>
                  {/* Update button */}
                  <Button variant="info" className="mr-2" onClick={() => navigate(`/assets/update/${asset._id}`)}>
                    Update
                  </Button>

                  {/* Delete button */}
                  <Button variant="danger" onClick={() => handleDelete(asset._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No assets found</p>
      )}
    </Container>
  );
};

export default Assets;
