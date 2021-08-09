import React, { useContext } from 'react'

import { DataContext } from './DataProvider'

const Title = () => {
  const { date: [date] } = useContext(DataContext)

  return (
    <div>
      <h2>
        Rulebook viewer
        <br />
        {date || null }
      </h2>
    </div>
  )
}

export default Title
