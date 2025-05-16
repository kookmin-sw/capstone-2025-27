import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Payment from './Payment';
import Result from './Result';
import PaymentVerify from './PaymentVerify';


function App() {

  return (
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/result" element={<Result />} />
        <Route path="/payment-verify" element={<PaymentVerify />} />
      </Routes>

  )
}

export default App
