import React, { useState, useEffect, createContext } from 'react'
import ruleParser from '../utils/ruleParser'

export const DataContext = createContext(null)

const DataProvider = ({ children }) => {
  const DEFAULT_URI = process.env.REACT_APP_DEFAULT_URI

  const [url, setUrl] = useState(localStorage.getItem('url'))
  const [data, setData] = useState({})
  const [ruleIndex, setRuleIndex] = useState(new Set())
  const [date, setDate] = useState(null)
  const [loading, setLoading] = useState(false)

  const [status, setStatus] = useState({ name: 'noerror', text: '' })

  const changeStatus = (name, text) => {
    setStatus({ name, text })
    setTimeout(() => {
      setStatus({ name: 'noerror', text: '' })
    }, 5000)
  }

  useEffect(() => {
    const savedUrl = localStorage.getItem('url')

    if (!url) {
      localStorage.setItem('url', DEFAULT_URI)
      setUrl(DEFAULT_URI)
    }

    setData({})
    setRuleIndex(new Set())
    setDate(null)
    setLoading(true)

    ruleParser(url)
      .then((res) => {
        setData(res.dict)
        setRuleIndex(res.ruleSet)
        setDate(res.date)
        setLoading(false)
        setUrl(url)
        if (url !== savedUrl) {
          changeStatus('success', 'Rules updated succesfully!')
        }
        localStorage.setItem('url', url)
      }).catch(() => {
        setLoading(false)
        changeStatus('error', 'Oh dear, something went wrong. Perhaps the url is wrong?')
      })
  }, [url])

  const store = {
    data: [data, setData],
    ruleIndex: [ruleIndex, setRuleIndex],
    date: [date, setDate],
    loading: [loading, setLoading],
    url: [url, setUrl],
    status: [status],
    default: [DEFAULT_URI],
  }

  return (
    <DataContext.Provider value={store}>
      { children }
    </DataContext.Provider>
  )
}

export default DataProvider
