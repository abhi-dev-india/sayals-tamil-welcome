
import React from 'react';

const KolamPattern = ({ className = "", size = "w-16 h-16" }: { className?: string; size?: string }) => {
  return (
    <div className={`${size} ${className} kolam-pattern`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <pattern id="kolamDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
          </pattern>
        </defs>
        
        {/* Kolam base pattern with dots */}
        <rect width="100" height="100" fill="url(#kolamDots)" opacity="0.3"/>
        
        {/* Central flower design */}
        <g transform="translate(50,50)" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8">
          {/* Outer petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle})`}>
              <path d="M 0,-20 Q -8,-12 0,-8 Q 8,-12 0,-20" fill="currentColor" opacity="0.6"/>
            </g>
          ))}
          
          {/* Inner circle */}
          <circle r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.4"/>
          
          {/* Center dot */}
          <circle r="3" fill="currentColor"/>
        </g>
        
        {/* Corner decorations */}
        <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6">
          <path d="M 15,15 Q 25,5 35,15 Q 25,25 15,15"/>
          <path d="M 85,15 Q 75,5 65,15 Q 75,25 85,15"/>
          <path d="M 15,85 Q 25,95 35,85 Q 25,75 15,85"/>
          <path d="M 85,85 Q 75,95 65,85 Q 75,75 85,85"/>
        </g>
      </svg>
    </div>
  );
};

export default KolamPattern;
