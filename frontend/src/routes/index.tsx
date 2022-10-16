import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Suspense, lazy, useState, useCallback, useEffect } from 'react'
import { ConfirmationResult, User } from 'firebase/auth'
import { firebaseObserver, loggedIn } from '../utils/firebase'
import { auth } from '../utils/firebase'

const Home = lazy(() => import('../views/Home'))
const Login = lazy(() => import('../views/Login'))
const Confirm = lazy(() => import('../views/Confirm'))

const PortalRoutes = () => {
  const [user, setUser] = useState<User | null>(loggedIn())
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>()
  const navigate = useNavigate()

  const confirmationResultCB = useCallback(
    (confirmationResult: ConfirmationResult) => {
      setConfirmationResult(confirmationResult)
    },
    [],
  )

  useEffect(() => {
    firebaseObserver.subscribe('authStateChanged', (data: User | null) => {
      setUser(data)
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
    console.log('AUTHENTICATED?', user)

    if (!user) {
      return
    }

    navigate('/')
  }, [user, navigate])

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={<Login confirmationResultCB={confirmationResultCB} />}
        />
        <Route
          path="/confirm"
          element={
            <Confirm
              confirmationResult={confirmationResult}
              setUserCB={setUser}
            />
          }
        />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Suspense>
  )
}

export default PortalRoutes
