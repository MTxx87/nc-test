import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getAuth,
  RecaptchaVerifier,
  ConfirmationResult,
  signInWithPhoneNumber,
} from 'firebase/auth'
import firebaseApp from '../utils/firebase'
import { validatePhoneNumber } from '../utils/helpers'
//@ts-ignore
import mergeClassNames from 'merge-class-names'

const Login = () => {
  const [captcha, setCaptcha] = useState<RecaptchaVerifier>()
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>()
  const [error, setError] = useState<string>()
  const [phone, setPhone] = useState<string>('')

  const auth = useMemo(() => getAuth(firebaseApp), [])

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setError(undefined)

      const isValid = validatePhoneNumber(phone)

      if (isValid !== true) {
        setError(isValid)
        return
      }

      console.log('WORKS!')

      // signInWithPhoneNumber(auth, '+46703984252', captcha as RecaptchaVerifier)
      //   .then((confirmationResult) => {
      //     // SMS sent. Prompt user to type the code from the message, then sign the
      //     // user in with confirmationResult.confirm(code).
      //     console.log(confirmationResult)
      //     window.confirmationResult = confirmationResult
      //     // ...
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     // Error; SMS not sent
      //     // ...
      //   })
    },
    [auth, captcha, phone],
  )

  useEffect(() => {
    setCaptcha(
      new RecaptchaVerifier(
        'login-button',
        {
          size: 'invisible',
        },
        auth,
      ),
    )
  }, [auth])

  return (
    <>
      <header className="App-header">
        <div className="card" style={{ maxWidth: '360px' }}>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="mb-5">
                <h1 className="card-title text-dark mb-5">Login</h1>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-dark"
                >
                  Enter your mobile number to log in.
                </label>
                <input
                  type="text"
                  placeholder="+46 XX XXX XX XX"
                  className={mergeClassNames(
                    'form-control',
                    error && 'is-invalid',
                  )}
                  id="phone"
                  aria-describedby="phoneHelp"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value)
                  }}
                />
                <div className="invalid-feedback">{error}</div>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="login-button"
                >
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

export default Login
