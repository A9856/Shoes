import React from 'react';
import { Mail } from 'lucide-react';

export default function EmailNotification({ show }) {
  if (!show) return null;
  
  return (
    <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-pulse">
      <div className="bg-white rounded-full p-2">
        <Mail size={24} className="text-green-500" />
      </div>
      <div>
        <p className="font-bold">Email Sent Successfully!</p>
        <p className="text-sm">Order confirmation has been sent to your email</p>
      </div>
    </div>
  );
}
