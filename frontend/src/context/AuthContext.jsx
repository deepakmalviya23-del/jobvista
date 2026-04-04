import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// ✅ Add interceptor here
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, API }}>
      {children}
    </AuthContext.Provider>
  )
}