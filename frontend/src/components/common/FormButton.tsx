import React from 'react';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({ 
  className = '', 
  children,
  ...props 
}) => {
  const baseClasses = "w-full h-[4.5rem] bg-black text-white rounded-[1.5rem] text-xl leading-[1.75rem] font-bold hover:bg-white hover:text-black";
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <button
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormButton;
