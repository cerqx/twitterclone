import React, { InputHTMLAttributes, ReactElement } from 'react'

interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event:  React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange
}) => {
  return (
    <div>Input</div>
  )
}

export default Input