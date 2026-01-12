import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  as?: 'input' | 'textarea';
  rows?: number;
}

const FormInput: React.FC<FormInputProps> = ({ 
  as = 'input', 
  className = '', 
  rows,
  ...props 
}) => {
  const baseClasses = "w-full pl-6 pr-12 border border-gray-300 rounded-[1.5rem] bg-white text-text-primary";
  const textSizeClass = as === 'textarea' ? "text-sm" : "text-xl";
  const heightClass = as === 'textarea' ? "h-[8rem]" : "h-[4rem]";
  const textareaClasses = as === 'textarea' ? "pt-4" : "";
  const combinedClasses = `${baseClasses} ${textSizeClass} ${heightClass} ${textareaClasses} ${className}`;

  if (as === 'textarea') {
    return (
      <textarea
        className={combinedClasses}
        rows={rows}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <input
      className={combinedClasses}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );
};

export default FormInput;
