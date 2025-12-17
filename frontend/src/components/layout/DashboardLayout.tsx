import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { useSettings } from '@/contexts/SettingsContext';

const DashboardLayout: React.FC = () => {
  const auth = useAuth();
  const settingsContext = useSettings();

  if (!auth || !settingsContext) {
    return <div>Loading...</div>;
  }

  const { isAuthenticated } = auth;
  const { settings } = settingsContext;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isMobileLayout = settings?.layout === 'mobile';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {isMobileLayout ? <MobileSidebar /> : <Sidebar />}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
