import { useCallback, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
//@ts-ignore
import mergeClassNames from 'merge-class-names'
import { validateEmail, validateName } from '../utils/helpers'

type CustomError = {
  email?: string
  name?: string
}

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<CustomError>({})

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

  const save = useCallback(() => {
    setError({})
    const validEmail = validateEmail(email)
    const validName = validateName(name)

    if (validEmail !== true || validName !== true) {
      setError({
        email: validEmail === true ? undefined : validEmail,
        name: validName === true ? undefined : validName,
      })
      return
    }

    setLoading(true)
  }, [email, name])

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
                <div className="mb-3 row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={mergeClassNames(
                        'form-control',
                        error.name && 'is-invalid',
                      )}
                      id="name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                      }}
                    />
                    <div className="invalid-feedback">{error.name}</div>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={mergeClassNames(
                        'form-control',
                        error.email && 'is-invalid',
                      )}
                      id="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                      }}
                    />

                    <div className="invalid-feedback">{error.email}</div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="logout-button"
                  onClick={save}
                >
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Home
