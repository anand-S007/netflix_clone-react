import { Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'

const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        navigate('/')
        console.log('logged in')
      }else {
        navigate('/login')
        console.log('logged out')
      }
    })
  }, [])

  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/player/:id' element={<Player />} />
        </Routes>
      </div>
    </AuthProvider>

  )
}

export default App

