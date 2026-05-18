import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalCursor from './components/GlobalCursor'
import SmoothScroll from './components/SmoothScroll'
import Intro from './pages/Intro'
import Overview from './pages/Overview'
import Research from './pages/Research'

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <GlobalCursor />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/overview" element={<Overview />} />
        <Route path='/research' element={<Research /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
