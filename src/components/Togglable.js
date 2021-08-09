import React, { useState } from 'react'

const Togglable = ({
  children,
  buttonText,
  buttonClass,
  activeClass = buttonClass,
}) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(buttonClass)

  const handleSetOpen = () => {
    setOpen(!open)
    setActive(open ? buttonClass : activeClass)
  }

  return (
    <div>
      <button type="button" onClick={() => handleSetOpen()} className={active}>{ buttonText }</button>
      { open ? (
        <div>
          { children }
        </div>
      ) : null }
    </div>
  )
}

export default Togglable
