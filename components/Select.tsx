import React, { useId } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, children, ...props }) => {
  const id = useId();
  return (
    <div className="relative">
      <select
        id={id}
        className="block w-full px-3 py-3 text-white bg-slate-800 rounded-lg border-2 border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer"
        {...props}
      >
        {children}
      </select>
      <label
        htmlFor={id}
        className="absolute text-sm text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-focus:text-indigo-400 start-1"
      >
        {label}
      </label>
    </div>
  );
};

export default Select;
