type Config = {
  backend_url: string
}

const config: Config = {
  backend_url: process.env.REACT_APP_BACKEND_URL || '',
}

export default config
