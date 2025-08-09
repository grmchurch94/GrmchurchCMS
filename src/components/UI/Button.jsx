import React from 'react';
import SafeIcon from '../../common/SafeIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  className = '',
  as = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap';
  
  const variants = {
    primary: 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white focus:ring-emerald-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
    outline: 'border border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm',
    md: 'px-3 sm:px-4 py-2 text-sm',
    lg: 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base',
  };
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  const Component = as;

  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      ) : icon ? (
        <SafeIcon icon={icon} className={`${children ? 'mr-1 sm:mr-2' : ''}`} />
      ) : null}
      <span className={icon && size === 'sm' ? 'hidden sm:inline' : ''}>{children}</span>
    </Component>
  );
};

export default Button;