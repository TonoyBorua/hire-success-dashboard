
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  ClipboardCheck,
  FileBarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DarkModeToggle from './DarkModeToggle';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Resume Review', href: '/resume-review', icon: FileText },
  { name: 'Resume Report', href: '/resume-report', icon: FileBarChart },
  { name: 'Create Interview', href: '/create-interview', icon: Video },
  { name: 'Interview Taking', href: '/interview-taking', icon: Users },
  { name: 'Interview Report', href: '/interview-report', icon: ClipboardCheck },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 dark:bg-gray-950 text-white">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-700 dark:border-gray-800">
        <h1 className="text-xl font-bold text-blue-400">InterviewPro</h1>
        <DarkModeToggle />
      </div>
      
      <nav className="flex-1 space-y-2 px-4 py-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-800 dark:hover:bg-gray-900',
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t border-gray-700 dark:border-gray-800 p-4">
        <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 dark:hover:bg-gray-900">
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
