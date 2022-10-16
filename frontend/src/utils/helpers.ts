export const validatePhoneNumber = (phone: string): true | string => {
  const reg = /^[0-9 ()+-]+$/

  if (!phone) {
    return 'Please provide a mobile number'
  }

  if (!reg.test(phone)) {
    return 'Only numbers and "+" allowed'
  }

  return true
}

export const validateCode = (code: string): true | string => {
  const reg = /^$|^\d{6}$/ //6 digits

  if (!code) {
    return 'Please provide a 6-digits code'
  }

  if (!reg.test(code)) {
    return 'Please provide a 6-digits code'
  }

  return true
}
