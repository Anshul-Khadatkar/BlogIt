/* eslint-disable no-unused-vars */
import React from 'react'

function Button({ //default values if user doesnt overwrite them this will be used
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text - white',
    className = '',
    ...props   //rest props spread
        
}) {
    return (
      
    <button className={`px-4 , py-2, rounded-lg ${bgColor} ${textColor} ${className} {...props}`}>{children}</button>
  )
}

export default Button