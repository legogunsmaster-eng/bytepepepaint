import { ButtonHTMLAttributes, ReactNode } from 'react';

interface DestructiveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function DestructiveButton({ children, className = '', onClick, disabled, ...props }: DestructiveButtonProps) {
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
        bg-[#dc2626] text-white 
        rounded-[10px] 
        transition-all duration-200
        hover:bg-[#b91c1c]
        active:bg-[#991b1b]
        disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] disabled:cursor-not-allowed
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