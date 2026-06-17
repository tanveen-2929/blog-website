import { createContext,useContext,useState,useEffect } from "react"
const AuthContext= createContext()
export const useAuth =()=>{return useContext(AuthContext)}
export const AuthProvider = ({children}) => {
    const [isUserLoggedIn , setIsUserLoggedIn] = useState(false)
    const [isAdminLoggedIn , setIsAdminLoggedIn] = useState(false)
    const value = {isUserLoggedIn , setIsUserLoggedIn, isAdminLoggedIn, setIsAdminLoggedIn}
    useEffect(()=>{
        const userid = localStorage.getItem('userid')
        const adminid = localStorage.getItem('admin')
        if(userid)
            setIsUserLoggedIn(true)
        else
        setIsUserLoggedIn(false)
        if(adminid) 
            setIsAdminLoggedIn(true)
        else
        setIsAdminLoggedIn(false)
    },[])
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext