/* eslint-disable no-unused-vars */
import React, { useId } from 'react'

// React.forwardRef is a higher order component that allows you to access the ref object that is created by React.createRef() in the parent component.
// This is useful when you want to manipulate the DOM node directly.
// htmlFor={id}> for attribute is used to link the label with the input

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props

}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}> 
                {label}
            </label>
            } 
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref} //ref is passed to the input
            {...props}
            id={id}
            />
        </div>
    )
})
export default Input