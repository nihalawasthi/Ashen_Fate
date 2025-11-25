import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as = 'div', className = '' }) => {
  const Tag = as as any;
  return (
    <Tag className={`glitch-border glitch ${className}`}>{text}</Tag>
  );
};

export default GlitchText;
