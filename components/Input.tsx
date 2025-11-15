
import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', ...props }) => {
  const id = useId();
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        className="block w-full px-3 py-3 text-white bg-slate-800 rounded-lg border-2 border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer"
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
