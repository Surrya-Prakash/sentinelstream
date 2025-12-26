import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VideoProvider } from './context/VideoContext';
import { SocketProvider } from './context/SocketContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import VideoUpload from './pages/VideoUpload';
import VideoDetail from './pages/VideoDetail';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <Router>
      <AuthProvider>
        <VideoProvider>
          <SocketProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>

              <Route element={<ProtectedRoute roles={['editor', 'admin']} />}>
                <Route path="/upload" element={<VideoUpload />} />
              </Route>

              <Route element={<ProtectedRoute roles={['admin']} />}>
                <Route path="/users" element={<UserManagement />} />
              </Route>
            </Routes>
          </SocketProvider>
        </VideoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
