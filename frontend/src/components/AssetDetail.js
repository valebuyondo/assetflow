import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAsset } from '../services/api';

const AssetDetail = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const getAsset = async () => {
      const { data } = await fetchAsset(id);
      setAsset(data);
    };
    getAsset();
  }, [id]);

  return (
    <div>
      {asset ? (
        <>
          <h1>{asset.name}</h1>
          <p>{asset.description}</p>
          {/* Add more fields based on your Asset.js */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AssetDetail;
