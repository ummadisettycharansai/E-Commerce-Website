import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function Button({ variant = 'primary', size = 'md', loading, children, className = '', ...props }: Props) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600',
    accent: 'bg-accent text-white hover:bg-accent-600',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5', lg: 'px-8 py-3 text-lg' };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}
