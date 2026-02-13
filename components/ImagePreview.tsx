"use client";

import Image from 'next/image';

interface ImagePreviewProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export default function ImagePreview({ isOpen, imageSrc, imageAlt, onClose }: ImagePreviewProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={800}
          height={800}
          className="w-full h-full object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-cyan-400 text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-cyan-300 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
