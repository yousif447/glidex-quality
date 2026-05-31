import React from 'react'

const variants = {
  primary: "bg-[var(--primary-color)] text-white",
  secondary: "bg-[var(--secondary-color)] text-white",
  outline: "border border-[var(--primary-color)] text-[var(--primary-color)]",
  success: "bg-[#3fc150] text-white",
}

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg"
}

export default function Button({children, variant = 'primary', size = 'md', className = '', ...props}) {
  return (
    <button 
      className = {`
        rounded-[var(--radius-md)]
        transition
        hover:opacity-80
        cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
