import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('../views/Home'))
const Login = lazy(() => import('../views/Login'))

const PortalRoutes = (props: any) => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  )
}

export default PortalRoutes
