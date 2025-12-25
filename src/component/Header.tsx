import React from 'react'
import Nav from './Nav'
import Logo from './Logo'
import LoginNav from './LoginNav'
import { UsersProvider } from './Context/UserDataContext'
import { useNavigate } from 'react-router-dom'


const Header = ({
    showNav
}) => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/Home');
    }

    return (
        <header className='flex items-center justify-between px-4 py-2 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm hover:shadow-md transition-shadow'>
            <button onClick={handleNavigateHome} className='cursor-pointer'><Logo /></button>
            {showNav?  <Nav/>: <></>}
            <UsersProvider>
                <LoginNav/>
            </UsersProvider>
             
        </header>
    )
}

export default Header
