import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Intro from './pages/Intro'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
