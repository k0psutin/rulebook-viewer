import testData from '../tests/testData'

const directory = /^\d{1,2}\./
const section = /^\d{3}\./
const subsection = /^\d{3}\.\d{1,3}/
const rule = /^\d{3}\.\d{1,3}\w{1}/
const ruleDate = /These rules are effective as of/

const parseLine = (oldKey, text, regex) => {
  const match = text.match(regex)
  if (match) {
    const key = match[0].trim().replace(/\.$/, '')
    const value = text.slice(key.length + 1)

    return { key, value }
  }
  return oldKey
}

const fetchText = async (url) => {
  if (!url.match(new RegExp(/\.txt$/, 'gi'))) {
    throw new Error('Invalid file form.')
  }

  if (process.env.NODE_ENV === 'test') {
    return testData
  }

  const result = await fetch(url).then((res) => res)

  if (result.status >= 400 && result.status < 600) {
    throw new Error('Invalid url.')
  }

  return result.text()
}

const ruleParser = async (url) => {
  const data = await fetchText(url).then((res) => res.split('\r\n')).catch(() => null)

  if (!data) {
    return null
  }

  let date = null

  const dict = {}
  const ruleSet = new Set()

  let dirIndex = { key: '', value: '' }
  let prevIndex = ''
  let secIndex = { key: '', value: '' }
  let prevSecIndex = ''
  let subSecIndex = { key: '', value: '' }
  let currRule = { key: '', value: '' }

  data.filter((result) => !Number.isNaN(result.charAt(0))).forEach((line) => {
    dirIndex = parseLine(dirIndex, line, directory)
    secIndex = parseLine(secIndex, line, section)
    subSecIndex = parseLine(subSecIndex, line, subsection)
    currRule = parseLine(currRule, line, rule)

    if (!date) {
      const dateMatch = line.match(ruleDate)
      if (dateMatch) {
        date = line.replace(dateMatch[0], '').replace('.', '').trim()
      }
    }

    if (dirIndex.key !== '') {
      if (!dict[dirIndex.key] && dirIndex.key) {
        const topic = dirIndex.value.trim()
        dict[dirIndex.key] = {
          topic,
          sections: {},
        }
      }

      if (prevIndex !== dirIndex.key) {
        secIndex = { key: '', value: '' }
        subSecIndex = { key: '', value: '' }
      }
      prevIndex = dirIndex.key
    }

    if (secIndex.key !== '') {
      if (!dict[dirIndex.key].sections[secIndex.key]) {
        const topic = secIndex.value.trim()
        dict[dirIndex.key]
          .sections[secIndex.key] = {
            topic,
            rules: {},
          }
      }

      if (prevSecIndex !== secIndex.key) {
        subSecIndex = { key: '', value: '' }
      }
      prevSecIndex = secIndex.key
    }

    if (secIndex.key !== '' && subSecIndex.key !== '') {
      if (!dict[dirIndex.key]
        .sections[secIndex.key]
        .rules[subSecIndex.key]) {
        const topic = subSecIndex.value.trim()
        dict[dirIndex.key]
          .sections[secIndex.key]
          .rules[subSecIndex.key] = {
            topic,
            subrules: {},
          }

        ruleSet.add(subSecIndex.key)
        ruleSet.add(secIndex.key)

        currRule = { key: '', value: '' }
      }
    }

    if (secIndex.key !== '' && subSecIndex.key !== '' && currRule.key !== '') {
      const topic = currRule.value.trim()
      dict[dirIndex.key]
        .sections[secIndex.key]
        .rules[subSecIndex.key]
        .subrules[currRule.key] = {
          topic,
        }

      ruleSet.add(currRule.key)
      currRule = { key: '', value: '' }
    }
  })

  if (!Object.keys(dict).length) {
    return null
  }

  return { dict, ruleSet, date }
}

export default ruleParser
