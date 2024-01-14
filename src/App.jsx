import { useState } from 'react'
import Main from './pages/Home/Main'
import Sidenav from './assets/components/Sidenav'
import FoodDisplay from './pages/FoodDisplay/FoodDisplay'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { diningHalls } from './firebase'

function App() {

  
  return (

    <div>
      <BrowserRouter>
      <Sidenav />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/Carrillo" element={<FoodDisplay name={diningHalls.CARRILLO} displayName="Carrillo" />} />
          <Route path="/DeLaGuerra" element={<FoodDisplay name={diningHalls.DLG} displayName="De La Guerra" />} />
          <Route path="/Portola" element={<FoodDisplay name={diningHalls.PORTOLA} displayName="Portola" />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
