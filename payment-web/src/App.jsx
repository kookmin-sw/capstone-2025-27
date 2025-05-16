import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Payment from './Payment';
import Result from './Result';


function App() {

  return (

      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/result" element={<Result />} />
      </Routes>

  )
}

export default App
