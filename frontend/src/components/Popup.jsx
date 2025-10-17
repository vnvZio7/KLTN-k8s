import { useState } from "react";
import { X } from "lucide-react";

function Popup({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 "></div>

      {/* Popup Box */}
      <div className="relative bg-white shadow-lg  p-8 animate-fadeIn z-10">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}

export default Popup;
