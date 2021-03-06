import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../service/AuthService'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await AuthService.isAuthenticated()
        console.log(res)
        if (res.isAuthenticated) {
          setUser(res.data.data.user)
          setIsAuthenticated(res.isAuthenticated)
        }
        setIsLoaded(true)
      } catch (err) {
        console.log(err)
      }
    }
    checkAuth()
  }, [])

  return (
    <div>
      {isLoaded && (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  )
}

export default AuthContextProvider
