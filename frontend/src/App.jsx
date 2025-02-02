import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './components/Index'
import Signup from './components/Signup'
import Signin from './components/Signin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App