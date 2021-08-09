import React, { useContext } from 'react'

import {
  BrowserRouter as Router, Route, Redirect,
} from 'react-router-dom'

import RuleList from './RuleList'
import Entry from './Entry'

import { DataContext } from './DataProvider'

const MainView = () => {
  const { data: [data] } = useContext(DataContext)
  const { loading: [loading] } = useContext(DataContext)

  return (
    <Router>
      <div className="float-container">
        <div className="float-left">
          { Object.keys(data)
            .map((key) => <Entry key={key} data={data} prevChapter={key} chapter={key} />) }
        </div>
        <div className="float-right">
          <Route path="/:index/:chapter">
            {Object.keys(data).length ? <RuleList /> : <Redirect to="/" /> }
          </Route>
          <Route path="/">
            <div className="rule">
              { loading ? 'Loading' : null }
            </div>
          </Route>
        </div>
      </div>
    </Router>
  )
}

export default MainView
