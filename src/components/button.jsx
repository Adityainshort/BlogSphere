// import { Button } from '@material-tailwind/react'
import React from 'react'

const button = ({
    children,
    type = 'button',
    className = '',
    bgColor = 'bg-blue-600',
    ...props
}) => {
  return (
    <button type={type} className={`${bgColor} text-white rounded  px-2 py-1 m-1 ${className}   `} {...props}>
        {children}
    </button>
  )
}

export default button