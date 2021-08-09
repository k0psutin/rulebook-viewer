import React, { useContext } from 'react'
import parseLink from '../utils/parseLink'

import { DataContext } from './DataProvider'

const Rule = ({ rule, index }) => {
  const { ruleIndex: [ruleIndex] } = useContext(DataContext)

  if (!rule[index]) {
    return null
  }

  const currRule = rule[index]

  return (
    <>
      <div id={index} className="rule">
        <b>{index}</b>
        {' '}
        -
        {' '}
        {parseLink(rule, index, ruleIndex).map((obj) => obj)}
      </div>
      {currRule.subrules
        ? Object.keys(currRule.subrules)
          .map((key) => (
            <Rule
              key={key}
              index={key}
              rule={currRule.subrules}
            />
          ))
        : null}
    </>
  )
}

export default Rule
