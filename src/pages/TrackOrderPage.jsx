import { useState } from 'react';
import api from '../api/client.js';

const TrackOrderPage = () => {
  const [lookup, setLookup] = useState('');
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setOrder(null);
    try {
      const response = await api.get(`/orders/track?lookup=${encodeURIComponent(lookup)}`);
      setOrder(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to find that order.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Order tracking</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Check your request</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input required value={lookup} onChange={(event) => setLookup(event.target.value)} placeholder="Phone number or order ID" className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-500" />
        <button type="submit" className="rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white">Find order</button>
      </form>
      {message && <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}
      {order && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm text-slate-500">Request #{order._id}</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{order.projectType}</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Order status</dt><dd className="mt-1 font-medium text-slate-900">{order.orderStatus}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Payment status</dt><dd className="mt-1 font-medium text-slate-900">{order.paymentStatus}</dd></div>
            {order.finalPrice !== null && <div><dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Final price</dt><dd className="mt-1 font-medium text-slate-900">KSh {order.finalPrice.toLocaleString()}</dd></div>}
          </dl>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
