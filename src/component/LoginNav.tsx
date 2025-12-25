
import LoginState from './LoginState'
import UserProfile from './UserProfile'
import Darkmode from './DarkMode'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from './Context/LogInContext'

const LoginNav = () => {
    const { isLoggedIn } = useContext(AuthContext);
    /* const [showProfile, setShowProfile] = useState(false); */
    
    /* useEffect(() => {
       if (isLoggedIn) {
           const timer = setTimeout(() => {
               setShowProfile(true);
           }, 1000); // 1 seconds
           
           return () => clearTimeout(timer); // cleanup on unmount
       } else {
           setShowProfile(false);
       }
   }, [isLoggedIn]); */

    return (
        <div className='flex items-center gap-2'>
            <Darkmode/>
            {
            isLoggedIn?
            <UserProfile/>
            : <LoginState/>
            }
            
        </div>
    )
}

export default LoginNav
