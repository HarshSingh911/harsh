import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 text-white/80 p-4 ${className}`}
        role="img"
        aria-label={alt || fallbackTitle || 'Travel visual'}
      >
        <Compass className="w-8 h-8 text-indigo-400 mb-2 opacity-80" />
        {fallbackTitle && (
          <span className="text-xs font-medium tracking-wide text-center text-slate-200">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || fallbackTitle || 'Travel photography'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
