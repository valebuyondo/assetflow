import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAsset } from '../services/api'; // Ensure you have this API setup
import './styles/AddAsset.css'; // External CSS for styling

const AssetDetail = () => {
  const { id } = useParams(); // Get asset ID from URL params
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAsset = async () => {
      try {
        const { data } = await fetchAsset(id);
        setAsset(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch asset details');
        setLoading(false);
      }
    };
    getAsset();
  }, [id]);

  if (loading) return <div className="loading">Loading asset details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!asset) return <div className="error">Asset not found</div>;

  return (
    <div className="asset-detail-container">
      <h1>Asset Details</h1>
      <div className="asset-detail-content">
        <div className="asset-info">
          <h2>{asset.name}</h2>
          <p><strong>Category:</strong> {asset.category}</p>
          <p><strong>Sub-Category:</strong> {asset.subCategory}</p>
          <p><strong>Serial Number:</strong> {asset.serialNumber}</p>
          <p><strong>Model:</strong> {asset.model || 'N/A'}</p>
          <p><strong>Manufacturer:</strong> {asset.manufacturer || 'N/A'}</p>
          <p><strong>Purchase Date:</strong> {new Date(asset.purchaseDate).toLocaleDateString()}</p>
          <p><strong>Purchase Price:</strong> ${asset.purchasePrice.toLocaleString()}</p>
          <p><strong>Current Value:</strong> ${asset.currentValue.toLocaleString()}</p>
          <p><strong>Depreciation Method:</strong> {asset.depreciationMethod}</p>
          <p><strong>Location:</strong> {asset.location}</p>
          <p><strong>Status:</strong> {asset.status}</p>
          <p><strong>Condition:</strong> {asset.condition}</p>
          <p><strong>Assigned To:</strong> {asset.assignedTo ? asset.assignedTo.username : 'Not Assigned'}</p>
          <p><strong>Last Maintenance:</strong> {asset.lastMaintenance ? new Date(asset.lastMaintenance).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Next Maintenance:</strong> {asset.nextMaintenance ? new Date(asset.nextMaintenance).toLocaleDateString() : 'N/A'}</p>
        </div>

        {/* Maintenance Logs */}
        {asset.maintenanceLogs && asset.maintenanceLogs.length > 0 && (
          <div className="maintenance-logs">
            <h3>Maintenance Logs</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Performed By</th>
                </tr>
              </thead>
              <tbody>
                {asset.maintenanceLogs.map(log => (
                  <tr key={log._id}>
                    <td>{new Date(log.date).toLocaleDateString()}</td>
                    <td>{log.description}</td>
                    <td>${log.cost.toLocaleString()}</td>
                    <td>{log.performedBy.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="asset-actions">
        <Link to={`/assets`} className="btn btn-primary">Back to Assets</Link>
      </div>
    </div>
  );
};

export default AssetDetail;
