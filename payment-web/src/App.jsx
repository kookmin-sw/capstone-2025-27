import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route } from 'react-router-dom'

function App() {

  return (
    <Route>
      <Route path="/payment" element={<Payment />} />
      <Route path="/result" element={<Result />} />
    </Route>
  )
}

export default App
