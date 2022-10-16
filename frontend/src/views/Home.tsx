import { useCallback, useEffect, useState } from 'react'
import { signOut, User } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
//@ts-ignore
import mergeClassNames from 'merge-class-names'
import { validateEmail, validateName } from '../utils/helpers'
import userApi from '../api/user'

type CustomError = {
  email?: string
  name?: string
}

type HomeProps = {
  user: User | null
}

const Home = (props: HomeProps) => {
  const { user } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [formError, setFormError] = useState<CustomError>({})
  const [error, setError] = useState<string>()

  const navigate = useNavigate()

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        navigate('/login')
      })
      .catch(() => {
        alert('We could not logout at the moment, try later.')
      })
  }, [navigate])

  const save = useCallback(() => {
    const editUserData = async (phone: string, name: string, email: string) => {
      setLoading(true)

      const result = await userApi({
        phone,
        method: 'PUT',
        body: {
          email,
          name,
        },
      })

      if (!result.success) {
        setError('Something went wrong, please try again')
        return
      }

      const user = result.data
      setLoading(false)
      setName(user.name)
      setEmail(user.email)
    }

    setError(undefined)
    setFormError({})
    const validEmail = validateEmail(email)
    const validName = validateName(name)

    if (validEmail !== true || validName !== true) {
      setFormError({
        email: validEmail === true ? undefined : validEmail,
        name: validName === true ? undefined : validName,
      })
      return
    }

    if (!user?.phoneNumber) {
      setError('Something went wrong, please try again')
      return
    }

    editUserData(user.phoneNumber, name, email)
  }, [email, name, user])

  useEffect(() => {
    const getUserData = async (phone: string) => {
      const result = await userApi({
        phone,
      })

      if (!result.success) {
        setError('Something went wrong, please try again')
        setLoading(false)
        return
      }

      const user = result.data
      setName(user.name)
      setEmail(user.email)
    }

    if (!user?.phoneNumber) {
      return
    }

    getUserData(user.phoneNumber)
  }, [user])

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
                        formError.name && 'is-invalid',
                      )}
                      id="name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                      }}
                    />
                    <div className="invalid-feedback">{formError.name}</div>
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
                        formError.email && 'is-invalid',
                      )}
                      id="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                      }}
                    />

                    <div className="invalid-feedback">{formError.email}</div>
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
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
