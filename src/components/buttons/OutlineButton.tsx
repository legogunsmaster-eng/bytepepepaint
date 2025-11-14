import { ButtonHTMLAttributes, ReactNode } from 'react';

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function OutlineButton({ children, className = '', onClick, disabled, ...props }: OutlineButtonProps) {
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
        bg-transparent text-[#0052ff] 
        border border-[#0052ff] 
        rounded-[10px] 
        transition-all duration-200
        hover:bg-[#e6f0ff]
        active:bg-[#dbeafe]
        disabled:border-[#e5e7eb] disabled:text-[#9ca3af] disabled:cursor-not-allowed
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