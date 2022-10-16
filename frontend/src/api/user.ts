import config from '../config'

export type ApiResult<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: any
    }

type User = {
  email: string
  name: string
}

type UserApiResult = ApiResult<User>

const userApi = async (params: {
  phone: string
  body?: User
  method?: 'GET' | 'PUT'
}): Promise<UserApiResult> => {
  let { phone, body, method } = params

  if (!method) {
    method = 'GET'
  }

  const endpoint = `/users/${phone}`
  const url = config.backend_url + endpoint

  return new Promise((resolve) => {
    let headers: any = {
      accept: 'application/json',
    }

    if (method !== 'GET') {
      headers['Content-Type'] = 'application/json'
    }

    fetch(url, {
      headers,
      method,
      body: body ? JSON.stringify(body) : null,
    })
      .then((response) => {
        if (typeof response.ok === 'undefined' || response.ok === false) {
          throw response
        }

        return response.json()
      })
      .then((data) => {
        resolve({
          success: true,
          data: data,
        })
      })
      .catch((error) => {
        resolve({
          success: false,
          error: error,
        })
      })
  })
}

export default userApi
