import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Nav, Navbar } from 'react-bootstrap';
import { fetchDashboardStats } from '../services/api';  // API to fetch stats
import '../styles/Dashboard.css';  // Updated styling

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: [], totalAssets: [], recentActivities: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchDashboardStats();
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
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand href="/">AssetFlow Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/assets">Assets</Nav.Link>
          <Nav.Link href="#">Manage Users</Nav.Link>
          <Nav.Link href="#">View Reports</Nav.Link>
          <Nav.Link href="#">My Profile</Nav.Link>
          <Button variant="outline-danger" onClick={() => navigate('/logout')} className="ml-3">
            Logout
          </Button>
        </Nav>
      </Navbar>

      <main className="main-content">
        <div className="dashboard-header text-center mb-4">
          <h1>Welcome to AssetFlow</h1>
          <p>Click on the stats to manage them</p>
        </div>

        <Row className="dashboard-statistics mb-5">
          <Col xs={12} sm={6} xl={3}>
            <Card className="stat-card clickable shadow-sm" onClick={() => navigate('/assets')}>
              <Card.Body>
                <Card.Title>Total Assets</Card.Title>
                <Card.Text>{stats.totalAssets}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} xl={3}>
            <Card className="stat-card clickable shadow-sm" onClick={() => navigate('#')}>
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <Card.Text>{stats.totalUsers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="quick-actions mb-5">
          <h2 className="text-center mb-4">Quick Actions</h2>
          <Row className="justify-content-center">
            <Col xs={12} sm={4}>
              <Button variant="primary" className="w-100 mb-2" onClick={() => navigate('/add-asset')}>
                Add New Asset
              </Button>
            </Col>
            <Col xs={12} sm={4}>
              <Button variant="secondary" className="w-100 mb-2" onClick={() => navigate('#')}>
                Search Assets
              </Button>
            </Col>
            <Col xs={12} sm={4}>
              <Button variant="info" className="w-100 mb-2" onClick={() => navigate('#')}>
                Manage Maintenance
              </Button>
            </Col>
          </Row>
        </div>

        <div className="recent-activities">
          <h2 className="mb-4">Recent Activities</h2>
          <ul className="list-group">
            {stats.recentActivities.map((activity, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center clickable"
                onClick={() => navigate(`/assets/${activity.assetId}`)}
              >
                <span>{activity.activity}</span>
                <small className="text-muted">{activity.date}</small>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Container>
  );
};

export default Dashboard;
