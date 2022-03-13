import { Routes, Route } from 'react-router-dom'

import { Home } from './components/Home/Home'
import { Inbox } from './components/Inbox/Inbox'
import { Send } from './components/Send/Send'
import { Nav } from './components/Nav/Nav'
import { Profile } from './components/Profile/Profile'

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/send" element={<Send />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  )
}

export default App
