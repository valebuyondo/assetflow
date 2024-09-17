import React, { useState, useEffect } from 'react';
import { fetchMaintenanceLogs, addMaintenanceLog } from '../services/api';  // API functions
import { Container, Form, Button, Table } from 'react-bootstrap';

const ManageMaintenance = ({ assetId }) => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    description: '',
    date: '',
  });

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await fetchMaintenanceLogs(assetId);  // Fetch maintenance logs
      setLogs(data);
    };

    fetchLogs();
  }, [assetId]);

  const handleAddLog = async (e) => {
    e.preventDefault();
    await addMaintenanceLog(assetId, newLog);  // Add a new maintenance log
    setNewLog({ description: '', date: '' });
    // Refresh logs after adding
    const updatedLogs = await fetchMaintenanceLogs(assetId);
    setLogs(updatedLogs);
  };

  return (
    <Container>
      <h1>Manage Maintenance Logs</h1>
      <Form onSubmit={handleAddLog}>
        <Form.Group controlId="formLogDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter maintenance description"
            name="description"
            value={newLog.description}
            onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLogDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={newLog.date}
            onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add Maintenance Log</Button>
      </Form>

      <h2 className="mt-4">Existing Logs</h2>
      {logs.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.description}</td>
                <td>{new Date(log.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No maintenance logs found</p>
      )}
    </Container>
  );
};

export default ManageMaintenance;
