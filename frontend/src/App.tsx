import { Routes, Route } from "react-router-dom"
import SignIn from './pages/signin/signin'
import SignUp from './pages/signup/signup'

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
