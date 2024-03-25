import { useEffect } from "react";
import { useState } from "react"
import { createContext } from "react"
import {auth} from "../firebase"
 
export const AuthContext = createContext()

export default function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false)
      console.log(user)
    })
  }, [])

  // const myObject = {}; 
  // This creates an empty object literal
  const value = {currentUser}

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
