import React from 'react';

const Background = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Hình khối bên trái */}
      <div className="absolute top-20 left-10 float opacity-20">
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M12 16C12 13.7909 13.7909 12 16 12H32V52H16C13.7909 52 12 50.2091 12 48V16Z" fill="white" />
          <path d="M32 12H48C50.2091 12 52 13.7909 52 16V48C52 50.2091 50.2091 52 48 52H32V12Z" fill="white" opacity="0.7" />
        </svg>
      </div>

      {/* Hình khối bên phải */}
      <div className="absolute top-40 right-20 float-slow opacity-20">
        <svg width="70" height="70" viewBox="0 0 64 64" fill="none">
          <path d="M32 8L56 20L32 32L8 20L32 8Z" fill="white" />
          <path d="M12 24V36L32 46L52 36V24" stroke="white" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* Hình tròn dưới cùng */}
      <div className="absolute bottom-20 left-20 float opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="30" cy="30" r="3" fill="white" />
          <circle cx="70" cy="40" r="3" fill="white" />
          <circle cx="50" cy="65" r="3" fill="white" />
        </svg>
      </div>

      {/* Máy bay */}
      <div className="absolute top-32 fly-plane">
        <svg width="50" height="50" viewBox="0 0 64 64" fill="white" opacity="0.3">
          <path d="M56 28L48 26L36 8L30 10L36 26L22 24L18 18L14 19L16 28L14 37L18 38L22 32L36 30L30 46L36 48L48 30L56 28Z" />
        </svg>
      </div>
    </div>
  );
};

export default Background;          