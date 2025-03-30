import { Route, Routes } from "react-router-dom"
import HomePage from "./page/HomePage"
import ChatPage from "./page/ChatPage"

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" Component={HomePage}/>
      <Route path="/chats" Component={ChatPage}/>
      </Routes>
    </div>
  )
}

export default App
