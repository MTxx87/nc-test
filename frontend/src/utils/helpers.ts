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
