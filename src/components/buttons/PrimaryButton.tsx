import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, className = '', onClick, disabled, ...props }: PrimaryButtonProps) {
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
        bg-[#0052ff] text-white 
        rounded-[10px] 
        transition-all duration-200
        hover:bg-[#0046dd]
        active:bg-[#003bbb]
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