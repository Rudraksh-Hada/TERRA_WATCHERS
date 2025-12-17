import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LineChart, Activity, Heart, Settings, Info, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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

const MobileSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed bottom-4 left-4 z-50 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-card">
        <nav className="flex flex-col h-full py-4">
          <ul className="space-y-1 px-2 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
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
          
          <div className="p-2 border-t border-border">
            <NavLink
              to="/dashboard/settings"
              onClick={() => setOpen(false)}
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
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
