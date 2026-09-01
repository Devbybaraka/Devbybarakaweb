import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    trim: true,
    default: '',
  },
  clientEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  projectType: {
    type: String,
    required: true,
    enum: ['Website Design', 'Business Website', 'E-Commerce Store', 'Web App', 'Landing Page', 'Full-Stack System'],
  },
  packagePlan: {
    type: String,
    default: 'Starter',
  },
  budgetRange: {
    type: String,
    required: true,
  },
  timeline: {
    type: String,
    default: '2-4 Weeks',
  },
  projectDetails: {
    type: String,
    required: true,
    minlength: 20,
  },
  amount: {
    type: Number,
    default: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    default: '',
    trim: true,
  },
  orderStatus: {
    type: String,
    enum: ['new', 'discussion', 'awaiting_payment', 'paid', 'in_progress', 'completed'],
    default: 'new',
  },
  finalPrice: {
    type: Number,
    default: null,
  },
  paidAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
