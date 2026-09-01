import { MessageCircle } from 'lucide-react';

const whatsappNumber = String(import.meta.env.VITE_ADMIN_WHATSAPP || '254755375947').replace(/\D/g, '');
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello, I would like to discuss a project.')}`;

const WhatsAppButton = ({ className = '' }) => (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 ${className}`}
  >
    <MessageCircle size={16} />
    WhatsApp me
  </a>
);

export default WhatsAppButton;
