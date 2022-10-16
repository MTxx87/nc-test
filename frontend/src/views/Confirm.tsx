import { useCallback, useEffect, useState } from 'react'
import { ConfirmationResult } from 'firebase/auth'
//@ts-ignore
import mergeClassNames from 'merge-class-names'
import { useNavigate } from 'react-router-dom'
import { validateCode } from '../utils/helpers'

type ConfirmProps = {
  confirmationResult?: ConfirmationResult
}

const Confirm = (props: ConfirmProps) => {
  const { confirmationResult } = props
  const [error, setError] = useState<string>()
  const [code, setCode] = useState<string>('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      setError(undefined)

      const isValid = validateCode(code)

      if (isValid !== true) {
        setError(isValid)
        return
      }

      if (typeof confirmationResult === 'undefined') {
        setError('Something went wrong, please try again.')
        return
      }

      setError(undefined)
      setLoading(true)
      confirmationResult
        .confirm(code)
        .then((result) => {
          setLoading(false)
          const user = result.user
          console.log('WE LOGGED IN!', user)
        })
        .catch(() => {
          setLoading(false)
          setError(
            'We could not log in with the provided code, please try again.',
          )
        })
    },
    [code, confirmationResult],
  )

  useEffect(
    () => {
      if (typeof confirmationResult === 'undefined') {
        navigate('/login')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      //confirmationResult //not here by choice
    ],
  )

  return (
    <>
      <header className="App-header">
        <div className="card" style={{ maxWidth: '360px', width: '360px' }}>
          <div className="card-body">
            <form>
              <div className="mb-5">
                <h1 className="card-title text-dark mb-5">Login</h1>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-dark"
                >
                  Enter the 6-digits code
                </label>
                <input
                  type="text"
                  placeholder="XXXXXX"
                  className={mergeClassNames(
                    'form-control',
                    error && 'is-invalid',
                  )}
                  id="phone"
                  aria-describedby="phoneHelp"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value)
                  }}
                />
                <div className="invalid-feedback">{error}</div>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-primary"
                  id="login-button"
                  onClick={onSubmit}
                >
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
    </>
  )
}

export default Confirm
