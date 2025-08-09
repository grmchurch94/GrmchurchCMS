import React from 'react';
import MemberDashboard from './MemberDashboard';
import AccountantDashboard from './AccountantDashboard';
import PastorDashboard from './PastorDashboard';
import InfoUnitDashboard from './InfoUnitDashboard';
import MediaDashboard from './MediaDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  // Get user role from localStorage or context
  const user = JSON.parse(localStorage.getItem('churchUser') || '{}');
  const userRole = user.role || 'Administrator';

  // Determine which dashboard to show based on user role
  const getDashboardComponent = () => {
    switch (userRole) {
      case 'Member':
        return <MemberDashboard />;
      case 'Accountant':
      case 'Finance Manager':
        return <AccountantDashboard />;
      case 'Pastor':
        return <PastorDashboard />;
      case 'Info Unit':
      case 'Communications':
        return <InfoUnitDashboard />;
      case 'Media Department':
      case 'Media Manager':
        return <MediaDashboard />;
      case 'Administrator':
      default:
        return <AdminDashboard />;
    }
  };

  return getDashboardComponent();
};

export default Dashboard;