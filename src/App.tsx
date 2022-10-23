import React from 'react'

import MainMenu from "./modules/MainMenu"

const App = () => {

  return (
    <MainMenu navigation={ {} } maxScore={ 100 } maxScoreWins={ true } savedGames={ [] } edited={ true } />
  )
}

export default App
