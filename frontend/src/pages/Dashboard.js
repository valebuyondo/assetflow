import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';  // Dashboard-specific styling

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalAssets: 0,
    recentActivities: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const role = localStorage.getItem('role');
    if (role) {
      setUserRole(role);
    } else {
      navigate('/login');
    }

    const fetchStatistics = () => {
      setStatistics({
        totalUsers: 120,
        totalAssets: 450,
        recentActivities: [
          { activity: 'Asset #123 checked in', date: '2024-09-14' },
          { activity: 'New user registered', date: '2024-09-13' }
        ]
      });
    };

    fetchStatistics();
    setLoading(false);
  }, [navigate]);

  if (loading || !userRole) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>AssetFlow Dashboard</h2>
        <ul>
          <li><a href="/assets">Assets</a></li>
          {userRole === 'admin' && <li><a href="/manage-users">Manage Users</a></li>}
          {(userRole === 'admin' || userRole === 'manager') && <li><a href="/reports">View Reports</a></li>}
          <li><a href="/profile">My Profile</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Welcome, {userRole === 'admin' ? 'Admin' : 'User'}</h1>
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
