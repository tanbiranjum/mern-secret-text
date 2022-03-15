const url = 'http://localhost:8000'

const AuthService = {
  login: async (user) => {
    const res = await fetch(`${url}/api/v1/user/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return { isAuthenticated: true, data }
  },
  signup: async (user) => {
    const res = await fetch(`${url}/api/v1/user/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  },
  logout: async () => {
    await fetch(`${url}/api/v1/user/logout`, {
      method: 'GET',
      credentials: 'include',
    })
  },
  isAuthenticated: async () => {
    const res = await fetch(`${url}/api/v1/user/authenticated`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    if (res.status !== 401) {
      const data = await res.json()
      return { isAuthenticated: true, data }
    }
    return { isAuthenticated: false, user: { email: '', nickName: '' } }
  },
}

export default AuthService
