/// <reference types="react-scripts" />

import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth'

declare module 'merge-class-names'
declare module 'react-event-observer'

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    confirmationResult: ConfirmationResult
  }
}
