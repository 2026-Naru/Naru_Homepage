import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalCursor from './components/GlobalCursor'
import SmoothScroll from './components/SmoothScroll'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Research from './pages/Research'
import Result from './pages/Result'
import Ui1 from './pages/Ui1'
import Ui2 from './pages/Ui2'
import Ui3 from './pages/Ui3'
import FeedBack from './pages/FeedBack'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/overview', element: <Overview /> },
  { path: '/research', element: <Research /> },
  { path: '/result', element: <Result /> },
  { path: '/ui1', element: <Ui1 /> },
  { path: '/ui2', element: <Ui2 /> },
  { path: '/ui3', element: <Ui3 /> },
  { path: '/feedback', element: <FeedBack /> },
]

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <GlobalCursor />
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
