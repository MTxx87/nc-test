import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Suspense, lazy, useState, useCallback, useEffect } from 'react'
import { ConfirmationResult } from 'firebase/auth'
import { firebaseObserver, loggedIn } from '../utils/firebase'

const Home = lazy(() => import('../views/Home'))
const Login = lazy(() => import('../views/Login'))
const Confirm = lazy(() => import('../views/Confirm'))

const PortalRoutes = () => {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>()
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(loggedIn())

  const confirmationResultCB = useCallback(
    (confirmationResult: ConfirmationResult) => {
      setConfirmationResult(confirmationResult)
    },
    [],
  )

  useEffect(() => {
    firebaseObserver.subscribe('authStateChanged', (data: any) => {
      setAuthenticated(data)
    })
    return () => {
      firebaseObserver.unsubscribe('authStateChanged')
    }
  }, [])

  useEffect(() => {
    if (typeof confirmationResult === 'undefined') {
      return
    }

    navigate('/confirm')
  }, [confirmationResult, navigate])

  useEffect(() => {
    console.log('AUTHENTICATED?', authenticated)

    if (!authenticated) {
      return
    }

    navigate('/')
  }, [authenticated, navigate])

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login confirmationResultCB={confirmationResultCB} />}
        />
        <Route
          path="/confirm"
          element={<Confirm confirmationResult={confirmationResult} />}
        />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Suspense>
  )
}

export default PortalRoutes
