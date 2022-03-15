import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { Inbox } from './components/Inbox/Inbox'
import { Send } from './components/Send/Send'
import { Nav } from './components/Nav/Nav'
import { Profile } from './components/Profile/Profile'
import { AuthContext } from './contexts/AuthContext'

function RequireAuth({ children }) {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? children : <Navigate to="/" replace />
}

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/send"
          element={
            <RequireAuth>
              <Send />
            </RequireAuth>
          }
        />
        <Route
          path="/inbox"
          element={
            <RequireAuth>
              <Inbox />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  )
}

export default App
