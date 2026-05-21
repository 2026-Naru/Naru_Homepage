import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalCursor from './components/GlobalCursor'
import SmoothScroll from './components/SmoothScroll'
import Intro from './pages/Intro'
import Overview from './pages/Overview'
import Research from './pages/Research'
import Result from './pages/Result'
import Ui1 from "./pages/Ui1"

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <GlobalCursor />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/overview" element={<Overview />} />
        <Route path='/research' element={<Research /> }/>
        <Route path='/result' element={<Result /> }/>
        <Route path='/ui1' element={<Ui1 /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
