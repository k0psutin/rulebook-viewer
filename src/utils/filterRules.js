const filterRules = (data, text) => {
  const dict = data
  Object.keys(dict.rules).forEach((index) => {
    const first = dict.rules[index].topic.match(new RegExp(text, 'gi'))
    if (dict.rules[index].subrules) {
      Object.keys(dict.rules[index].subrules).forEach((key) => {
        const second = dict.rules[index].subrules[key].topic.match(new RegExp(text, 'gi'))
        if (!second) {
          delete (dict.rules[index].subrules[key])
        } else {
          dict.rules[key] = dict.rules[index].subrules[key]
        }
      })

      delete (dict.rules[index].subrules)
    }

    if (!first) {
      delete (dict.rules[index])
    }
  })

  dict.rules = Object.keys(dict.rules).sort().reduce((res, key) => {
    res[key] = dict.rules[key]
    return res
  }, {})

  return dict
}

export default filterRules
