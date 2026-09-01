import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('ChangeMe123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft lg:grid-cols-[1fr_0.9fr]">
        <div className="bg-slate-900 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Administrative access</p>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">Business operations workspace</h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Manage client inquiries, monitor project lifecycle progress, and maintain the portfolio content publishing workflow.
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Login</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Secure admin portal</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400"
              />
            </div>
            {error && <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            <button type="submit" disabled={loading} className="w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-70">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
