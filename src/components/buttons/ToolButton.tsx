import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ToolButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}

export function ToolButton({ children, active = false, className = '', onClick, disabled, ...props }: ToolButtonProps) {
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
        w-10 h-10 
        rounded-[8px] 
        transition-all duration-200
        ${
          active
            ? 'bg-[#0052ff] text-white shadow-sm'
            : 'bg-transparent text-[#1a1a1a] hover:bg-[#f5f7fa] active:bg-[#e6f0ff]'
        }
        disabled:text-[#9ca3af] disabled:cursor-not-allowed disabled:bg-transparent
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