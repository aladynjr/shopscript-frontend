import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Homepage from './pages/Homepage';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen  bg-gray-100">
        {/* <nav className="bg-gray-800 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-white text-lg font-semibold">TikTok Showcase</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/admin">Admin</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
 */}
        <main className="w-full">
          <div >
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;