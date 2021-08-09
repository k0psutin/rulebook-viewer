import filterRules from '../utils/filterRules'
import ruleParser from '../utils/ruleParser'

let dict = null

describe('filterRules tests', () => {
  beforeEach(async () => {
    dict = await ruleParser('testData.txt').then((res) => res.dict)
  })

  it('Empty string returns whole list', async () => {
    const data = dict['1'].sections['100']
    const filteredData = filterRules(data, '')
    const dataSize = Object.keys(filteredData.rules).length
    expect(dataSize).toBe(3)
  })

  it('Proper string returns one match', async () => {
    const data = dict['1'].sections['100']
    const filteredData = filterRules(data, 'Another notion')
    const dataSize = Object.keys(filteredData.rules).length
    expect(dataSize).toBe(1)
  })

  it('Proper string returns three matches', async () => {
    const data = dict['2'].sections['200']
    const filteredData = filterRules(data, 'And another')
    const dataSize = Object.keys(filteredData.rules).length
    expect(dataSize).toBe(3)
  })

  it('Filter works on different capitalization', async () => {
    const data = dict['1'].sections['100']
    const filteredData = filterRules(data, 'aNoThEr NoTiOn')
    const dataSize = Object.keys(filteredData.rules).length
    expect(dataSize).toBe(1)
  })

  it('Wrong string returns zero matches', async () => {
    const data = dict['1'].sections['100']
    const filteredData = filterRules(data, 'jagababa')
    const dataSize = Object.keys(filteredData.rules).length
    expect(dataSize).toBe(0)
  })
})
