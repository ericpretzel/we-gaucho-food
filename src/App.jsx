import { useState } from 'react'
import Main from './pages/Home/Main'
import Sidenav from './assets/components/Sidenav'
import Carrillo from './pages/Carrillo/Carrillo'
import DLG from './pages/DLG/DLG'
import Portola from './pages/Portola/Portola'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  
  return (

    <div>
      <BrowserRouter>
      <Sidenav />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/Carrillo" element={<Carrillo />} />
          <Route path="/De La Guerra" element={<DLG />} />
          <Route path="/Portola" element={<Portola />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
