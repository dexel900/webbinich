import type React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      style={{
        padding: '10px 16px',
        borderRadius: 12,
        border: '1px solid #e3e3e3',
        background: '#FFC14F',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    />
  );
};
