import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        alert('We could not logout at the moment, try later.')
      })
  }, [navigate])

  return (
    <>
      <header className="App-header">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h1>Home</h1>
                  </div>
                  <div className="col text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="logout-button"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Home
