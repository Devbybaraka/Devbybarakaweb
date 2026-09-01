import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/client.js';

const orderStatuses = ['new', 'discussion', 'awaiting_payment', 'paid', 'in_progress', 'completed'];
const paymentStatuses = ['pending', 'paid', 'failed'];
const emptyForm = { title: '', description: '', image: '', liveLink: '', githubLink: '', techStack: '', category: '', featured: false };

const AdminDashboardPage = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/admin/login');
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([api.get('/orders'), api.get('/projects')]).then(([ordersResponse, projectsResponse]) => {
      setOrders(ordersResponse.data);
      setProjects(projectsResponse.data);
    }).catch(console.error);
  }, [isAuthenticated]);

  const updateOrder = async (orderId, field, value) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { [field]: value });
      setOrders((current) => current.map((order) => order._id === orderId ? response.data : order));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Order update failed.');
    }
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    try {
      let image = form.image;
      if (imageFile) {
        const data = new FormData();
        data.append('image', imageFile);
        const uploadResponse = await api.post('/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        image = uploadResponse.data.url;
      }
      const response = await api.post('/projects', { ...form, image, techStack: form.techStack.split(',').map((item) => item.trim()).filter(Boolean) });
      setProjects((current) => [response.data, ...current]);
      setForm(emptyForm);
      setImageFile(null);
      setMessage('Project published.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Project creation failed.');
    }
  };

  if (loading || !user) return <div className="mx-auto max-w-7xl px-4 py-20 text-sm text-slate-600 sm:px-6 lg:px-8">Loading dashboard...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Admin</p><h1 className="mt-3 text-3xl font-semibold text-slate-900">Operations dashboard</h1></div><button onClick={logout} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm">Sign out</button></div>
      {message && <p className="mb-6 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{message}</p>}
      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"><h2 className="text-xl font-semibold text-slate-900">Orders</h2><table className="mt-5 min-w-full text-left text-sm"><thead><tr className="border-b border-slate-200 text-slate-500"><th className="px-3 py-3">Client</th><th className="px-3 py-3">Request</th><th className="px-3 py-3">Order status</th><th className="px-3 py-3">Payment</th><th className="px-3 py-3">Final price</th></tr></thead><tbody>{orders.map((order) => <tr key={order._id} className="border-b border-slate-100"><td className="px-3 py-4"><div className="font-medium">{order.clientName}</div><div className="text-xs text-slate-500">{order.phoneNumber}</div></td><td className="px-3 py-4">{order.projectType}</td><td className="px-3 py-4"><select value={order.orderStatus} onChange={(event) => updateOrder(order._id, 'orderStatus', event.target.value)} className="rounded border border-slate-200 px-2 py-1">{orderStatuses.map((status) => <option key={status}>{status}</option>)}</select></td><td className="px-3 py-4"><select value={order.paymentStatus} onChange={(event) => updateOrder(order._id, 'paymentStatus', event.target.value)} className="rounded border border-slate-200 px-2 py-1">{paymentStatuses.map((status) => <option key={status}>{status}</option>)}</select></td><td className="px-3 py-4"><input type="number" defaultValue={order.finalPrice || ''} onBlur={(event) => updateOrder(order._id, 'finalPrice', event.target.value)} className="w-28 rounded border border-slate-200 px-2 py-1" /></td></tr>)}</tbody></table></section>
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"><h2 className="text-xl font-semibold text-slate-900">Add new project</h2><form onSubmit={handleProjectSubmit} className="mt-5 grid gap-4 md:grid-cols-2"><input required placeholder="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded border border-slate-200 px-3 py-2.5" /><input required placeholder="Category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded border border-slate-200 px-3 py-2.5" /><textarea required placeholder="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows="4" className="rounded border border-slate-200 px-3 py-2.5 md:col-span-2" /><input placeholder="Image URL (or choose a file)" value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} className="rounded border border-slate-200 px-3 py-2.5" /><input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files[0])} className="rounded border border-slate-200 px-3 py-2.5" /><input type="url" placeholder="Live link" value={form.liveLink} onChange={(event) => setForm({ ...form, liveLink: event.target.value })} className="rounded border border-slate-200 px-3 py-2.5" /><input type="url" placeholder="GitHub link" value={form.githubLink} onChange={(event) => setForm({ ...form, githubLink: event.target.value })} className="rounded border border-slate-200 px-3 py-2.5" /><input required placeholder="Tech stack, comma separated" value={form.techStack} onChange={(event) => setForm({ ...form, techStack: event.target.value })} className="rounded border border-slate-200 px-3 py-2.5" /><label className="flex items-center gap-2 px-3 py-2.5 text-sm"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Featured project</label><button type="submit" className="rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white md:col-span-2">Publish project</button></form></section>
      <p className="mt-4 text-xs text-slate-500">{projects.length} portfolio projects published</p>
    </div>
  );
};

export default AdminDashboardPage;
