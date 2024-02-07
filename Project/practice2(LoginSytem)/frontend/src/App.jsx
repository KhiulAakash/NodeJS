import { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'

function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    const isLogin=JSON.parse(localStorage.getItem('user'));
    console.log(isLogin)
  },[])
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
