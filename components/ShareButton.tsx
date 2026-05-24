'use client';

import { useState } from 'react';
import Link from 'next/link'
import { Share2, X, Link as LinkIcon, Check, MessageCircle, Car } from 'lucide-react';

export default function ShareButton({ url, title }: { url?: string; title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || 'Check out this car on ShahMotors!';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      color: 'bg-green-500',
      href: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>,
      color: 'bg-blue-600',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'X (Twitter)',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
            </svg>,
      color: 'bg-black',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
      >
        <Share2 size={20} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl scale-in-center">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Share This Car</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`${social.color} text-white p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110`}>
                      {social.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-600">{social.name}</span>
                  </Link>
                ))}
              </div>

              {/* Copy Link Section */}
              <div className="relative group">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Copy Link</p>
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-2xl group-hover:border-red-200 transition-colors">
                  <LinkIcon size={16} className="text-gray-400" />
                  <input 
                    readOnly 
                    value={shareUrl} 
                    className="bg-transparent text-sm font-medium text-gray-600 flex-1 outline-none truncate"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="bg-white border shadow-sm p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                {copied && (
                  <p className="absolute -bottom-6 left-1 text-[10px] py-2 font-black text-green-600 uppercase">Copied to clipboard!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Simple internal helper for the Copy icon
function Copy({ size }: { size: number | string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
}