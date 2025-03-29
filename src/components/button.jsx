// import { Button } from '@material-tailwind/react'
import React from 'react'

const button = ({
    children,
    type = 'button',
    className = '',
    bgColor = 'bg-blue-600',
    ...props
}) => {
  return type === 'loading' ? (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  ) : (
    <button type={type} className={`${bgColor} text-white rounded px-2 py-1 m-1 ${className}`} {...props}>
      {children}
    </button>
  );
  
}

export default button