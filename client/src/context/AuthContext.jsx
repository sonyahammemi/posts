import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
// contexte instance with createcontexte
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isauth, setisauth] = useState(false)
    const [role, setrole] = useState('visitor')
    const [isLoaded, setisLoaded] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/auth/isauth', { credentials: 'include' })
            .then(res => {
               
                res.json().then(data => {
                    console.log(data);
                    setisLoaded(true)
                    if (res.status !== 403) {
                        setrole(data.role)
                        setisauth(data.isAuthenticated)
                    } else {
                        setisauth(false)
                        setrole('visitor')
                    }
                }
                )

            }
            )
    }, [])


    return (
        <React.Fragment>
            {
                isLoaded ?
                    (<AuthContext.Provider value={{ role, setrole, isauth, setisauth }}>
                        {children}
                    </AuthContext.Provider>) :
                    <p>... loading</p>
            }
        </React.Fragment>
    )
}

export default AuthProvider
