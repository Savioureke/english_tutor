import React from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close Video"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <iframe
          src={videoUrl}
          title="Video Player"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
