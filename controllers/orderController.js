import Order from '../models/Order.js';

export const submitOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, paymentStatus: 'pending', orderStatus: 'new' });
    const whatsappNumber = String(process.env.ADMIN_WHATSAPP || '').replace(/\D/g, '');
    const message = [`New project request #${order._id}`, `Name: ${order.clientName}`, `Company: ${order.companyName || 'N/A'}`, `Email: ${order.clientEmail}`, `Phone: ${order.phoneNumber}`, `Project: ${order.projectType}`, `Package: ${order.packagePlan}`, `Budget: ${order.budgetRange}`, `Timeline: ${order.timeline}`, `Details: ${order.projectDetails}`].join('\n');
    const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : null;
    res.status(201).json({ message: 'Inquiry submitted successfully.', order, whatsappUrl });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Inquiry submission failed.' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, finalPrice, paymentMethod } = req.body;
    const updates = {};
    if (orderStatus) updates.orderStatus = orderStatus;
    if (paymentStatus) {
      updates.paymentStatus = paymentStatus;
      updates.paidAt = paymentStatus === 'paid' ? new Date() : null;
    }
    if (finalPrice !== undefined && finalPrice !== '') updates.finalPrice = Number(finalPrice);
    if (paymentMethod !== undefined) updates.paymentMethod = paymentMethod;
    const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Status update failed.' });
  }
};

export const trackOrder = async (req, res) => {
  try {
    const lookup = String(req.query.lookup || '').trim();
    if (!lookup) return res.status(400).json({ message: 'Enter a phone number or order ID.' });
    const idMatch = lookup.match(/^[0-9a-fA-F]{24}$/);
    const order = await Order.findOne({ $or: [{ phoneNumber: lookup }, ...(idMatch ? [{ _id: lookup }] : [])] }).select('clientName projectType orderStatus paymentStatus finalPrice createdAt');
    if (!order) return res.status(404).json({ message: 'No order found.' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Invalid order lookup.' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    await order.deleteOne();
    res.json({ message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Order deletion failed.' });
  }
};
