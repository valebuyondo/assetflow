import React, { useEffect, useState } from 'react';
import { fetchAssets } from '../services/api';
import { Link } from 'react-router-dom';

const AssetList = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const getAssets = async () => {
      const { data } = await fetchAssets();
      setAssets(data);
    };
    getAssets();
  }, []);

  return (
    <div>
      <h1>Assets</h1>
      <ul>
        {assets.map((asset) => (
          <li key={asset._id}>
            <Link to={`/assets/${asset._id}`}>{asset.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;
