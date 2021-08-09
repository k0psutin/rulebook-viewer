import React, { useState, useContext } from 'react'

import { DataContext } from './DataProvider'

import Togglable from './Togglable'

const CustomUrlInput = () => {
  const { url: [url, setUrl] } = useContext(DataContext)
  const { status: [status] } = useContext(DataContext)
  const { default: [DEFAULT_URI] } = useContext(DataContext)
  const [newUrl, setNewUrl] = useState('')

  const handleUrlChange = () => {
    if (!url || url === '') {
      return
    }

    setUrl(newUrl)
  }

  const defaultUrl = () => {
    setUrl(DEFAULT_URI)
    setNewUrl(DEFAULT_URI)
  }

  return (
    <div>
      <Togglable buttonText="Use different rules" buttonClass="urlButton" activeClass="urlButtonActive">
        <label htmlFor="customUri">
          URL:
          {' '}
          <input value={newUrl} onChange={(event) => setNewUrl(event.target.value)} className="url" id="customUri" placeholder={`e.g. ${url}`} />
        </label>
        <button type="button" onClick={() => handleUrlChange()} className="entry">Fetch</button>
        <button type="button" onClick={() => defaultUrl()} className="entry">Use default rules</button>
      </Togglable>
      <div className={status.name}>
        { status.text === '' ? <br /> : status.text }
      </div>
    </div>
  )
}

export default CustomUrlInput
