import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({ children, size = 'md', className = '', onClick, disabled, ...props }: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      className={`
        inline-flex items-center justify-center 
        ${sizeClasses[size]}
        bg-transparent text-[#1a1a1a] 
        rounded-[8px] 
        transition-all duration-200
        hover:bg-[#f5f7fa]
        active:bg-[#e6f0ff]
        disabled:text-[#9ca3af] disabled:cursor-not-allowed
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}