import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../service/AuthService'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await AuthService.isAuthenticated()
        setUser(res.data.data.user)
        setIsAuthenticated(res.isAuthenticated)
        setIsLoaded(true)
      } catch (err) {
        console.log(err)
      }
    }
    checkAuth()
  }, [])

  return (
    <div>
      {!isLoaded ? (
        <h1>loading</h1>
      ) : (
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
