import React from 'react'

const Button = ({
    children,
    type='button',
    className='',
    ...props
}) => {
  return (
    <button className={`${className} `}>{children}</button>
  )
}

export default Button

//todo in this file for button design