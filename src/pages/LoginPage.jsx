import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(formData);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background-dark">
      <div className="hidden lg:flex flex-col justify-center px-16 relative overflow-hidden bg-surface-dark border-r border-border-dark">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
        <div className="z-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-white text-4xl">smart_display</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">SentinelStream</h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Advanced video processing platform with real-time sensitivity analysis and secure streaming capabilities.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-background-dark p-4 rounded-xl border border-border-dark">
              <span className="material-symbols-outlined text-primary mb-2 text-2xl">security</span>
              <h3 className="text-white font-medium">Secure Content</h3>
              <p className="text-gray-500 text-sm mt-1">Enterprise-grade security</p>
            </div>
            <div className="bg-background-dark p-4 rounded-xl border border-border-dark">
              <span className="material-symbols-outlined text-primary mb-2 text-2xl">analytics</span>
              <h3 className="text-white font-medium">AI Analysis</h3>
              <p className="text-gray-500 text-sm mt-1">Real-time sensitivity check</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome back</h2>
            <p className="mt-2 text-gray-400">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-surface-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-600"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-surface-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-600"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primary-dark font-medium transition-colors">
                create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
