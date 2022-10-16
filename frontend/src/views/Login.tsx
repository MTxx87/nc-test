import { useCallback, useEffect, useState } from 'react'
import {
  RecaptchaVerifier,
  ConfirmationResult,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { validatePhoneNumber } from '../utils/helpers'
//@ts-ignore
import mergeClassNames from 'merge-class-names'

type LoginProps = {
  confirmationResultCB: (confirmationResult: ConfirmationResult) => void
}

const Login = (props: LoginProps) => {
  const { confirmationResultCB } = props
  const [captcha, setCaptcha] = useState<RecaptchaVerifier>()
  const [error, setError] = useState<string>()
  const [phone, setPhone] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setError(undefined)

      const isValid = validatePhoneNumber(phone)

      if (isValid !== true) {
        setError(isValid)
        return
      }

      console.log('Proceed!')
      setError(undefined)
      setLoading(true)
      signInWithPhoneNumber(auth, phone, captcha as RecaptchaVerifier)
        .then((confirmationResult) => {
          console.log('We sent the code')
          setLoading(false)
          confirmationResultCB(confirmationResult)
        })
        .catch(() => {
          setLoading(false)
          setError(
            'We could not send the SMS, please check the entered phone number or try again later.',
          )
        })
    },
    [captcha, confirmationResultCB, phone],
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
  }, [])

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
                  Enter your mobile number.
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
                  onClick={onSubmit}
                >
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Send code
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
