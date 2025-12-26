import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-surface-dark border-b border-border-dark h-16 fixed w-full top-0 z-50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">smart_display</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">SentinelStream</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/upload" className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium">
            <span className="material-symbols-outlined text-lg">upload</span>
            Upload
          </Link>

          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 hover:bg-white/5 px-2 py-1.5 rounded-lg transition-colors"
            >
              <div className="text-right hidden md:block">
                <div className="text-white text-sm font-medium">{user?.name}</div>
                <div className="text-gray-400 text-xs">{user?.organization?.name}</div>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)}
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface-dark border border-border-dark rounded-xl shadow-xl py-1 transform origin-top-right">
                <div className="px-4 py-2 border-b border-border-dark">
                  <div className="text-white text-sm font-medium truncate">{user?.email}</div>
                  <div className="text-xs text-primary mt-0.5 capitalize">{user?.role}</div>
                </div>
                {user?.role === 'admin' && (
                  <Link 
                    to="/users" 
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white text-sm"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="material-symbols-outlined text-lg">group</span>
                    User Management
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/5 hover:text-red-300 text-sm"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
