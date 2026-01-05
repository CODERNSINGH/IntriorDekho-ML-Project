import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Estimated from './components/Estimated'
import AIimage from './components/AIimage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>

    
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/about" element={<h1>you</h1>} />
      <Route path="/estimated" element={<Estimated/>} />
      <Route path="/aiimage" element={<AIimage/>} />
    </Routes>

    </>
  )
}

export default App
