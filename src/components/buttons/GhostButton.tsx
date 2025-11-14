import { ButtonHTMLAttributes, ReactNode } from 'react';

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function GhostButton({ children, className = '', onClick, disabled, ...props }: GhostButtonProps) {
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
        inline-flex items-center justify-center gap-2 px-4 py-2 
        bg-transparent text-[#1a1a1a] 
        rounded-[10px] 
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