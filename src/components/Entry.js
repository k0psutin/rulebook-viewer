import React from 'react'

import { NavLink } from 'react-router-dom'
import Togglable from './Togglable'

const Entry = ({ data, prevChapter, chapter }) => {
  if (!data[chapter]) {
    return null
  }

  const currChapter = data[chapter]

  const link = `/${prevChapter}/${chapter}`

  const topic = `${chapter} - ${currChapter.topic}`

  return (
    <div className="left">
      { currChapter.sections
        ? (
          <Togglable buttonText={topic} buttonClass="entry">
            { Object.keys(currChapter.sections)
              .map((key) => (
                <Entry
                  key={key}
                  data={currChapter.sections}
                  prevChapter={chapter}
                  chapter={key}
                />
              )) }
          </Togglable>
        )
        : (
          <div className="float-container">
            <NavLink activeClassName="activeEntry" className="entry" to={link}>{topic}</NavLink>
          </div>
        )}
    </div>
  )
}

export default Entry
