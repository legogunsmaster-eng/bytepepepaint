import { ButtonHTMLAttributes, ReactNode } from 'react';

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function LinkButton({ children, className = '', onClick, disabled, ...props }: LinkButtonProps) {
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
        inline-flex items-center justify-center gap-2 px-2 py-1 
        bg-transparent text-[#0052ff] 
        rounded-[6px] 
        transition-all duration-200
        hover:bg-[#e6f0ff] hover:underline
        active:bg-[#dbeafe]
        disabled:text-[#9ca3af] disabled:cursor-not-allowed disabled:no-underline
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