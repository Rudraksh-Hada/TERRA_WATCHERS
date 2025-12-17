import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LineChart, Activity, Heart, Settings, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Prediction', path: '/dashboard/prediction', icon: LineChart },
  { name: 'Sensors', path: '/dashboard/sensors', icon: Activity },
  { name: 'Sensor Health', path: '/dashboard/health', icon: Heart },
  { name: 'Mine Info', path: '/dashboard/mine-info', icon: Info },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-48 bg-card border-r border-border flex flex-col min-h-[calc(100vh-4rem)]">
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-primary text-primary-foreground shadow-md'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Settings at bottom */}
      <div className="p-2 border-t border-border">
        <NavLink
          to="/dashboard/settings"
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            'hover:bg-accent hover:text-accent-foreground',
            location.pathname === '/dashboard/settings' && 'bg-primary text-primary-foreground shadow-md'
          )}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
