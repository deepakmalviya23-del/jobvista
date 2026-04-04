import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-blue-600">JobVista</div>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/jobs" className="hover:text-blue-600 transition-colors">Find Jobs</Link>

          {user ? (
            
            <div className="flex items-center gap-6">
            <span className="font-medium">{user.name}</span>
            
            {user.role === 'seeker' && (
            <Link to="/seeker/dashboard" className="hover:text-blue-600">Dashboard</Link>
            )}
            
            {user.role === 'employer' && (
            <Link to="/post-job" className="hover:text-blue-600">Post Job</Link>
            )}

            <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
            <LogOut size={18} />
            Logout
            </button>
        </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;