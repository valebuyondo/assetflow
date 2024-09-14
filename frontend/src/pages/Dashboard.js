import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';  // Styling for the dashboard

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalAssets: 0,
    recentActivities: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role from token or API
    const role = localStorage.getItem('role');  // Example role stored in localStorage or token
    setUserRole(role);

    // Fetch statistics (mock example)
    const fetchStatistics = () => {
      setStatistics({
        totalUsers: 120,
        totalAssets: 450,
        recentActivities: [
          { activity: 'Asset #123 checked in', date: '2024-09-14' },
          { activity: 'New user registered: jdoe@example.com', date: '2024-09-13' }
        ]
      });
    };

    fetchStatistics();

    // Redirect to login if not authenticated
    if (!role) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>AssetFlow Dashboard</h2>
        <ul>
          <li><a href="/assets">Assets</a></li>
          {userRole === 'admin' && <li><a href="/manage-users">Manage Users</a></li>}
          {userRole === 'admin' || userRole === 'manager' ? <li><a href="/reports">View Reports</a></li> : null}
          <li><a href="/profile">My Profile</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Welcome, {userRole === 'admin' ? 'Admin' : userRole === 'manager' ? 'Manager' : 'User'}</h1>
          <p>Here is your overview and recent activities.</p>
        </div>

        <div className="dashboard-statistics">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{statistics.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Assets</h3>
            <p>{statistics.totalAssets}</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            {userRole === 'admin' && (
              <div className="action-card" onClick={() => navigate('/add-user')}>
                <h3>Manage Users</h3>
                <p>Add, edit, or delete users</p>
              </div>
            )}
            <div className="action-card" onClick={() => navigate('/add-asset')}>
              <h3>Add New Asset</h3>
              <p>Add a new asset to the system</p>
            </div>
            <div className="action-card" onClick={() => navigate('/reports')}>
              <h3>View Reports</h3>
              <p>Generate or view system reports</p>
            </div>
          </div>
        </div>

        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            {statistics.recentActivities.map((activity, index) => (
              <li key={index}>
                <p>{activity.activity}</p>
                <small>{activity.date}</small>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
