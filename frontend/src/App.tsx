import './App.css'
import PortalRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PortalRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
