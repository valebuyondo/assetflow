import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fetchDashboardStats } from '../services/api';  // API to fetch stats

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalAssets: 0, recentActivities: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchDashboardStats();  // Fetch stats from the backend
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
        setLoading(false);
      }
    };
    getStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Container fluid className="dashboard-container">
      <nav className="navbar">
        <h2>AssetFlow Dashboard</h2>
        <ul>
          <li><a href="/assets">Assets</a></li>
          <li><a href="/manage-users">Manage Users</a></li>
          <li><a href="/reports">View Reports</a></li>
          <li><a href="/profile">My Profile</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Welcome to AssetFlow</h1>
          <p>Click on the stats to manage them</p>
        </div>

        <Row className="dashboard-statistics">
          <Col xs={12} sm={6} xl={3}>
            <div className="stat-card clickable" onClick={() => navigate('/assets')}>
              <h3>Total Assets</h3>
              <p>{stats.totalAssets}</p>
            </div>
          </Col>
          <Col xs={12} sm={6} xl={3}>
            <div className="stat-card clickable" onClick={() => navigate('/manage-users')}>
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
          </Col>
        </Row>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <Row>
            <Col>
              <Button variant="primary" onClick={() => navigate('/add-asset')}>Add New Asset</Button>
            </Col>
            <Col>
              <Button variant="secondary" onClick={() => navigate('/search-assets')}>Search Assets</Button>
            </Col>
            <Col>
              <Button variant="info" onClick={() => navigate('/manage-maintenance')}>Manage Maintenance</Button>
            </Col>
          </Row>
        </div>

        <div className="recent-activities mt-4">
          <h2>Recent Activities</h2>
          <ul>
            {stats.recentActivities.map((activity, index) => (
              <li key={index} className="clickable" onClick={() => navigate(`/assets/${activity.assetId}`)}>
                <p>{activity.activity}</p>
                <small>{activity.date}</small>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Container>
  );
};

export default Dashboard;

