import React from 'react'

import Title from './components/Title'
import MainView from './components/MainView'
import CustomUrl from './components/CustomUrl'
import './App.css'

const App = () => (
  <div className="app">
    <Title />
    <CustomUrl />
    <MainView />
  </div>
)

export default App
