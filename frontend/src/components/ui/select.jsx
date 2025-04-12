import { useState } from "react"

export const Select = ({ value, onValueChange, children }) => (
  <select
    className="p-2 border rounded-md"
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
  >
    {children}
  </select>
)

export const SelectTrigger = ({ children, className }) => (
  <div className={className}>{children}</div>
)

export const SelectValue = ({ placeholder }) => (
  <option disabled>{placeholder}</option>
)

export const SelectContent = ({ children }) => <>{children}</>

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
)
