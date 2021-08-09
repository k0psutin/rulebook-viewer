import React from 'react'
import { NavHashLink } from 'react-router-hash-link'

const ruleRegex = new RegExp(/(in|rule|rules)\s((\d{3}\.\d{1,2}\w)|(\d{3}\.\d{1,2})|(\d{3}))/, 'gi')

const parseLink = (rule, index, ruleIndex) => {
  const currRule = rule[index]

  const ruleMatch = currRule.topic.match(ruleRegex)

  if (ruleMatch) {
    const cleanedArray = currRule.topic.split(ruleRegex).filter((entry) => entry !== undefined)
    const splitTopic = Array.from(new Set(cleanedArray)).map((entry) => {
      if (ruleIndex.has(entry)) {
        const root = entry.match(/\d{1}/)
        const target = entry.match(/\d{3}/)
        const key = Math.random().toString(36).substr(2, 5)
        const link = `/${root}/${target}#${entry}`
        if (process.env.NODE_ENV === 'test') {
          return link
        }
        return [' ', <NavHashLink key={key} className="refLink" to={link}>{entry}</NavHashLink>]
      }

      return entry
    })

    return splitTopic
  }

  return [rule[index].topic]
}

export default parseLink
