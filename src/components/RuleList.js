import React from 'react-dom'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import Rule from './Rule'
import filterRules from '../utils/filterRules'
import { DataContext } from './DataProvider'

const RuleList = () => {
  const { index } = useParams()
  const { chapter } = useParams()

  const { data: [data] } = useContext(DataContext)

  const [rules, setRules] = useState(data[index].sections[chapter])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setRules(data[index].sections[chapter])
  }, [chapter, index, data])

  const resetSearch = () => {
    setRules(data[index].sections[chapter])
    setFilter('')
  }

  const filterDict = () => {
    let copy = JSON.parse(JSON.stringify(data[index].sections[chapter]))
    copy = filterRules(copy, filter)
    setRules(copy)
  }

  if (rules) {
    return (
      <div className="rule">
        <br />
        <label htmlFor="filter">
          Filter the rules with:
          <input id="filter" type="text" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Search for a rule.." />
        </label>
        <button type="button" className="button" onClick={() => filterDict()}>Search</button>
        <button type="button" className="button" onClick={() => resetSearch()}>Reset</button>
        <h3 id={chapter}>{rules.topic}</h3>
        {Object.keys(rules.rules).length > 0
          ? Object.keys(rules.rules).map((key) => (
            <Rule
              key={key}
              index={key}
              rule={rules.rules}
            />
          ))
          : 'Oh dear, nothing to show. Could you kindly rephrase your search?'}
      </div>
    )
  }

  return 'Select a chapter'
}

export default RuleList
