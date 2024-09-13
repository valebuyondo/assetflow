import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAssets } from '../services/api'; // Ensure you have a working API call here
import '../styles/Assets.css'; // External CSS for styling

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assets from the backend when the component mounts
  useEffect(() => {
    const getAssets = async () => {
      try {
        const { data } = await fetchAssets();
        setAssets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assets');
        setLoading(false);
      }
    };
    getAssets();
  }, []);

  if (loading) return <div className="loading">Loading assets...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="assets-container">
      <h1>Asset List</h1>
      <div className="assets-table">
        <table>
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Purchase Date</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset._id}>
                <td>{asset.name}</td>
                <td>{asset.category}</td>
                <td>{new Date(asset.purchaseDate).toLocaleDateString()}</td>
                <td>${asset.value.toLocaleString()}</td>
                <td>
                  <Link to={`/assets/${asset._id}`} className="btn btn-details">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-asset-container">
        <Link to="/add-asset" className="btn btn-add">
          Add New Asset
        </Link>
      </div>
    </div>
  );
};

export default Assets;
