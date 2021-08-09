import ruleParser from '../utils/ruleParser'

describe('ruleParser tests', () => {
  it('Parses correct file format', () => {
    try {
      ruleParser('testData.txt')
      expect(true).toBe(true)
    } catch {
      expect(true).toBe(false)
    }
  })

  it('Doesn`t parse an incorrect file', () => {
    try {
      ruleParser('testData')
      expect(true).toBe(false)
    } catch {
      expect(true).toBe(true)
    }
  })

  it('Returns correct objects', async () => {
    const { dict, ruleSet, date } = await ruleParser('testData.txt').then((res) => res)
    expect(Object.keys(dict).length).toBe(2)
    expect(ruleSet.size).toBe(13)
    expect(date).toEqual('April 22, 2021')
  })

  it('Returns correct indexes', async () => {
    const { dict } = await ruleParser('testData.txt').then((res) => res)
    const correct = (dict['1'].topic === 'Index A' && dict['2'].topic === 'Index B')
    expect(correct).toBe(true)
  })

  it('Returns correct sections', async () => {
    const { dict } = await ruleParser('testData.txt').then((res) => res)
    const correct = (dict['1'].sections['100'].topic === 'Section of A' && dict['1'].sections['101'].topic === 'Another section of A')
    expect(correct).toBe(true)
  })

  it('Returns correct rules for a section', async () => {
    const { dict } = await ruleParser('testData.txt').then((res) => res)
    const { topic } = dict['1'].sections['100'].rules['100.1']
    expect(topic).toEqual('Rule of section A. See rule 101 and also see rule 200.1b.')
  })

  it('Returns correct notion for a rule', async () => {
    const { dict } = await ruleParser('testData.txt').then((res) => res)
    const { topic } = dict['1'].sections['100'].rules['100.1'].subrules['100.1a']
    expect(topic).toEqual('Notion of Rule 100.1')
  })
})
