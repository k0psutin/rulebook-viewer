import ruleParser from '../utils/ruleParser'
import parseLink from '../utils/parseLink'

let data = null

describe('parseLink tests', () => {
  beforeAll(async () => {
    data = await ruleParser('testData.txt')
  })
  it('Returns a link object for a reference', () => {
    const { dict, ruleSet } = data
    const obj = parseLink(dict['1'].sections['101'].rules, '101.2', ruleSet)
    expect(obj.includes('/2/200#200.1d')).toBe(true)
  })

  it('Does not return a link object for a reference that does not exist', () => {
    const { dict, ruleSet } = data
    const obj = parseLink(dict['2'].sections['200'].rules, '200.1', ruleSet)
    expect(obj.includes('/3/300#300.1b')).toBe(false)
  })

  it('Returns all link objects for all references', () => {
    const { dict, ruleSet } = data
    const obj = parseLink(dict['1'].sections['100'].rules, '100.1', ruleSet)
    const hasBothLinks = obj.includes('/1/101#101') && obj.includes('/2/200#200.1b')
    expect(hasBothLinks).toBe(true)
  })

  it('Returns an single array if rule does not have a reference', () => {
    const { dict, ruleSet } = data
    const obj = parseLink(dict['1'].sections['101'].rules, '101.1', ruleSet)
    expect(obj[0]).toEqual('Rule of another section A')
  })

  it('Doesn\'t parse arbitary numbers to links', () => {
    const { dict, ruleSet } = data
    const obj = parseLink(dict['2'].sections['200'].rules['200.1'].subrules, '200.1b', ruleSet)
    expect(obj[0]).toEqual('And another notation.. Player can haz 100 cheezburgers.')
  })

  it('Doesn\'t parse arbitary numbers to links if with other references', () => {
    const { dict, ruleSet } = data
    const obj = parseLink(dict['1'].sections['101'].rules, '101.2', ruleSet)
    const hasRuleLink = obj.includes('/2/200#200.1d')
    const hasNoCheezBurgerLink = !obj.includes('/1/100/#100')
    expect(hasRuleLink && hasNoCheezBurgerLink).toBe(true)
  })
})
