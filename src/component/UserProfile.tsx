import React from 'react'
import MenuBar from './MenuBar'
import Notification from './Notification'
import Cart from './Cart'
import UserProfileIcon from './UserProfileIcon'
import { useContext, useEffect } from 'react';
import { UsersContext } from './Context/UserDataContext';
import { AuthContext } from './Context/LogInContext';

const UserProfile = () => {
    const { firstName, setFirstName } = useContext(UsersContext);
    const { isLoggedIn  } = useContext(AuthContext);
    useEffect(() => {
        const storedUser = localStorage.getItem("Name");
        if ( isLoggedIn && storedUser) {
            setFirstName(JSON.parse(storedUser));
        }
    }, []);

    /* 
        cart -> clicked -> link to cart page
        notification -> clicked -> show dropdown notification
        profile icon - nothing
        MenuBar -> clicked -> show dropdown menu bar
    
    */
    return (
        <div className='flex items-center gap-2'>
            <Cart/>
            <Notification/>
            <UserProfileIcon/>
            <p className='text-xl p-1 text-red-400'>{firstName}</p>
            <MenuBar/>
        </div>
    )
}
 
export default UserProfile
