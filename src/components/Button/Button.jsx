import React from 'react'
import './Button.css'

export const Button = ({variant, onClick, children}) => {

  return (
    <button className={`button button_${variant}`} onClick={onClick}>{children}</button>
  )
}

